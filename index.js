// By VishwaGauravIn (https://itsvg.in)

const GenAI = require("@google/generative-ai");
const { TwitterApi } = require("twitter-api-v2");
const SECRETS = require("./SECRETS");

const twitterClient = new TwitterApi({
  appKey: SECRETS.APP_KEY,
  appSecret: SECRETS.APP_SECRET,
  accessToken: SECRETS.ACCESS_TOKEN,
  accessSecret: SECRETS.ACCESS_SECRET,
});

const generationConfig = {
  maxOutputTokens: 400,
};
const genAI = new GenAI.GoogleGenerativeAI(SECRETS.GEMINI_API_KEY);

async function run() {
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({
    model: "gemini-pro",
    generationConfig,
  });

  // Write your prompt here
  const prompt =
    "generate a twitter content based on this reference “I'm going to get to one million followers on here.Watch me, Disapper if you have to. Focus on you., 2025 is for healing., My type of healing:,In 2025, put god first., Enter the new year with a clean heart, let that hurt go., You can be friends with people for years and it cold take years to realize they were never your friends., Pray even after you get what you were praying for.,People want you to lose just because it’ll justify the risk they never took., Some people become loners because they were betrayed by every single person they ever trusted., Name one thing that Andrew Tate and Donald Trump have in common, What are the most attractive hobbies a woman can have?”or some rant or some advice as a tweet, it should not be vague and should be unique; between 50 - 150 characters and should be plain text, you can use sometimes one emoji.
";

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log(text);
  sendTweet(text);
}

run();

async function sendTweet(tweetText) {
  try {
    await twitterClient.v2.tweet(tweetText);
    console.log("Tweet sent successfully!");
  } catch (error) {
    console.error("Error sending tweet:", error);
  }
}
