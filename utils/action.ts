"use server";
import OpenAI from "openai";
import type { ChatCompletionMessage } from "openai/resources/index.mjs";

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
    });
    console.log(response.choices[0].message);
    return response.choices[0].message;
  } catch (error) {
    return null;
  }
}

export async function getExistingTour({ city, country }: destination_req) {
  return null;
}

export async function generateTourResponse({ city, country }: destination_req) {
  const query = `Find a exact ${city} in this exact ${country}.
If ${city} and ${country} exist, create a list of things families can do in this ${city},${country}. 
Once you have a list, create a one-day tour. Response should be  in the following JSON format: 
{
  "tour": {
    "city": "${city}",
    "country": "${country}",
    "title": "title of the tour",
    "description": "short description of the city and tour",
    "stops": [{"name":"short paragraph on the stop 1",
              "location":{
              "latitude":"latitude of this position","longitude":"longitude of this position"}
              }}, 
              {"name":"short paragraph on the stop 2",
              "location":{
               "latitude":"latitude of this position","longitude":"longitude of this position"},
               {"name":"short paragraph on the stop 3",
              "location":{
               "latitude":"latitude of this position","longitude":"longitude of this position"},]
  }
}
"stops" property should include only three stops.
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
    return tourData.tour;
  } catch (error) {
    console.log(error);
    return null;
  }
}
export async function createNewTour({ city, country }: destination_req) {
  return null;
}
