const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function recommendJobs(user, jobs) {

    const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash",
    });

    const prompt = `
You are an expert career advisor.

Candidate Profile:

Name: ${user.name}

Headline: ${user.headline || ""}

Skills:

${(user.skills || []).join(", ")}

Available Jobs:

${jobs
    .map(
        (job) => `
Title: ${job.title}
Company: ${job.company}
Location: ${job.location}
Skills: ${(job.skills || []).join(", ")}
Description:
${job.description}
`
    )
    .join("\n-----------------\n")}

Return ONLY valid JSON.

Example:

[
{
"title":"Frontend Developer",
"company":"Google",
"score":95,
"reason":"Excellent React match."
}
]
`;

    const result = await model.generateContent(prompt);

    const text = result.response.text();

    // Remove markdown if Gemini wraps JSON in ```json
    const cleaned = text
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

    return JSON.parse(cleaned);
}

module.exports = {
    recommendJobs,
};