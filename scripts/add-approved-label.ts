import { getOctokit } from "@actions/github";
import * as core from "@actions/core";

export default async ({ github, context, core, fetch }: any) => {
  const prNumber = Number(core.getInput("pr_number") || context.issue.number);
  const [owner, repo] = process.env.GITHUB_REPOSITORY?.split("/") || [];
  const token = process.env.RAYCAST_BOT_API_ACCESS_TOKEN || process.env.GITHUB_TOKEN;

  if (!token) {
    core.setFailed("No token available");
    return;
  }

  const octokit = getOctokit(token);

  try {
    await octokit.rest.issues.addLabels({
      owner,
      repo,
      issue_number: prNumber,
      labels: ["Approved"]
    });
    core.info(`Added 'Approved' label to PR #${prNumber} by ${token.startsWith('ghp_') ? 'raycastbot' : 'github-actions[bot]'}`);
  } catch (error) {
    core.error(`Failed to add label: ${error}`);
    core.setFailed(error.message);
  }
};
