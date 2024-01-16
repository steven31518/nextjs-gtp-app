"use server";
import OpenAI from "openai";
import type { ChatCompletionMessage } from "openai/resources/index.mjs";
import prisma from "./db";
import { revalidatePath } from "next/cache";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export type destination_req = {
  city: string;
  country: string;
};

export async function generateChatResponse(
  chatMessages: ChatCompletionMessage[]
) {
  try {
    const response = await openai.chat.completions.create({
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        ...chatMessages,
      ],
      model: "gpt-3.5-turbo",
      temperature: 0,
      max_tokens: 1000,
    });

    return {
      message: response.choices[0].message,
      tokens: response.usage?.total_tokens,
    };
  } catch (error) {
    return null;
  }
}

export async function generateTourResponse(
  { city, country }: destination_req,
  language?: string
) {
  const query = `Find a exact ${city} in this exact ${country}.
If ${city} and ${country} exist, create a list of things families can do in this ${city},${country}. 
Once you have a list, create a one-day tour. Response should be in the following JSON format: 
{
  "tour": {
    "city": "${city}",
    "country": "${country}",
    "title": "title of the tour",
    "description": "short description of the city and tour",
    "stops":["name of stop 1","name of stop 2","name of stop 3"] 
        }  
    }             
If you can't find info on exact ${city}, or ${city} does not exist, or it's population is less than 1, or it is not located in the following ${country},   return { "tour": null }, with no additional characters.`;
  try {
    const response = await openai.chat.completions.create({
      messages: [
        { role: "system", content: "you are a tour guide" },
        { role: "user", content: query },
      ],
      model: "gpt-3.5-turbo",
      temperature: 0,
    });
    const tourData = JSON.parse(response.choices[0].message.content as string);

    if (!tourData.tour) {
      return null;
    }
    return { tour: tourData.tour, tokens: response.usage?.total_tokens };
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getExistingTour({ city, country }: destination_req) {
  return prisma.tour.findUnique({
    where: {
      city_country: {
        city,
        country,
      },
    },
  });
}
export async function createNewTour(tour: {
  city: string;
  country: string;
  title: string;
  description: string;
  stops: string[];
}) {
  return prisma.tour.create({
    data: tour,
  });
}

export async function getAllTours(searchTerm?: string) {
  if (!searchTerm) {
    const tours = await prisma.tour.findMany({
      orderBy: {
        city: "asc",
      },
    });
    return tours;
  }
  const tours = prisma.tour.findMany({
    where: {
      OR: [
        {
          city: {
            contains: searchTerm,
          },
        },
        {
          country: {
            contains: searchTerm,
          },
        },
      ],
    },
    orderBy: {
      city: "asc",
    },
  });
  return tours;
}

export async function getTourById(id: string) {
  return prisma.tour.findUnique({
    where: {
      id,
    },
  });
}

export async function generateTourImage({ city, country }: destination_req) {
  try {
    const tourImage = await openai.images.generate({
      prompt: `a panoramic view of the ${city} ${country}`,
      n: 1,
      size: "512x512",
    });
    return tourImage?.data[0]?.url;
  } catch (error) {
    return null;
  }
}

export async function fetchUserTokenById(clerkId: string) {
  const result = await prisma.token.findUnique({
    where: {
      clerkId,
    },
  });
  return result?.tokens;
}

export async function generateUserTokenForId(clerkId: string) {
  const result = await prisma.token.create({
    data: {
      clerkId,
    },
  });
  return result?.tokens;
}

export async function fetchOrGenerateTokens(clerkId: string) {
  const result = await fetchUserTokenById(clerkId);
  if (result) {
    return result;
  }
  return await generateUserTokenForId(clerkId);
}

export async function subtractTokens(clerkId: string, tokens: number) {
  const result = await prisma.token.update({
    where: {
      clerkId,
    },
    data: {
      tokens: {
        decrement: tokens, //遞減 tokens
      },
    },
  });
  revalidatePath("/profile");
  return result?.tokens;
}
// [{"name":"stop name",
//                description":"short paragrah of the stop 1",
//               "location":{"latitude":"latitude of stop 1","longitude":"longitude of stop 1"}
//               },
//               {"name":"stop name",
//                description":"short paragrah of the stop 2",
//               "location":{"latitude":"latitude of stop2","longitude":"longitude of stop2"}
//               },
//               {"name":"stop name",
//               description":"short paragrah of the stop 3",
//              "location":{"latitude":"latitude of this stop 3","longitude":"longitude of stop 3}
//               }]
