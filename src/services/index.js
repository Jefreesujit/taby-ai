import { HumanMessage, AIMessage } from '@langchain/core/messages';
import { MessagesPlaceholder, ChatPromptTemplate, SystemMessagePromptTemplate } from '@langchain/core/prompts';
import { SYSTEM_PROMPT } from '../constants';
import { fetchChatHistory, updateChatHistory, fetchPageContext, getPrompt } from '../utils';

let model;

const getModel = async (pageContext) => {
  const { available, defaultTemperature, defaultTopK, maxTopK } = await ai.languageModel.capabilities();
  if (available !== "no") {
    if (!model) {
      console.log('Model not available, creating new one');
      let pageContext = '';
      try {
        pageContext = await fetchPageContext();
        console.log('pageContext', pageContext);
      } catch (error) {
        console.log('Error fetching page context', error);
      }
      const systemPrompt = getPrompt(pageContext);
      console.log('System prompt', systemPrompt);
      model = await ai.languageModel.create({
        systemPrompt,
        temperature: defaultTemperature,
        topK: defaultTopK,
        maxTopK: maxTopK
      });
    }
    return model;
  }
  throw new Error('Model not available');
}

const messageAI = async (message, cb) => {
  const chatHistory = await fetchChatHistory();
  const userHistory = chatHistory.map((item) => item.role === 'user' ? new HumanMessage(item.message) : new AIMessage(item.message));
  userHistory.push(new HumanMessage(message));
  const model = await getModel();
  // const pageContext = 'Sun shines brightly on the forest floor.';
  // const prompt = getPrompt(pageContext, message);
  const prompt = message;
  const stream = model.promptStreaming(prompt);
  let response = '';
  for await (const chunk of stream) {
    // TODO: Temporary fix until They fix the streaming
    // response += chunk;
    response = chunk;
    cb(chunk);
  }

  return response;
}

const sendMessage = async (message, cb) => {

  const response = await messageAI(message, cb);
  await updateChatHistory(message, response);
  return response;
}

export {
  sendMessage,
};