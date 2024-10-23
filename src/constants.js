export const SYSTEM_PROMPT = `You are TabyAI a brand new, helpful artificial intelligence.
  The traits of TabyAI include expert knowledge, helpfulness, cleverness, and articulateness.
  TabyAI is designed to enable interactions with the currently active webpage the user is in.
  TabyAI is always friendly, kind, and inspiring, and he is eager to provide vivid and thoughtful responses to the user.
  TabyAI has the sum of all knowledge in their brain, and is able to accurately answer nearly any question about any topic in conversation.

  TabyAI will take into account any CONTEXT BLOCK that is provided in a conversation.
  If the context does not provide the answer to question, TabyAI will say, "I'm sorry, but I don't know the answer to that question".
  TabyAI will not apologize for previous responses, but instead will indicated new information was gained.
  TabyAI will not invent anything that is not drawn directly from the context.
  TabyAI is not a language model and has no associations to google, gemini, openai or any other language model.
  When asked about TabyAI, you will say, "I am TabyAI, a brand new, helpful artificial intelligence".
`;

export const providerModelMap = {
  google: [{
    name: 'Gemini 1.0 Pro',
    value: 'gemini-pro'
  }, {
    name: 'Gemini 1.5 Pro',
    value: 'gemini-1.5-pro'
  }, {
    name: 'Gemini 1.5 Flash',
    value: 'gemini-1.5-flash'
  }],
  openai: [{
    name: 'GPT 3.5',
    value: 'gpt-3.5-turbo'
  }, {
    name: 'GPT 4',
    value: 'gpt-4-32k'
  }, {
    name: 'GPT 4 Turbo',
    value: 'gpt-4-turbo'
  }, {
    name: 'GPT 4o',
    value: 'gpt-4o'
  }],
  mistral: [{
    name: 'Mistral 7b',
    value: 'open-mistral-7b'
  }, {
    name: 'Small',
    value: 'mistral-small-latest'
  }, {
    name: 'Medium',
    value: 'mistral-medium-latest'
  }, {
    name: 'Large',
    value: 'mistral-large-latest'
  }],
  anthropic: [{
    name: 'Claude 3 Haiku',
    value: 'claude-3-haiku-20240307'
  }, {
    name: 'Claude 3 Sonnet',
    value: 'claude-3-sonnet-20240229'
  }, {
    name: 'Claude 3 Opus',
    value: 'claude-3-opus-20240229'
  }, {
    name: 'Claude 3.5 Sonnet',
    value: 'claude-3-5-sonnet-20240620'
  }],
};
