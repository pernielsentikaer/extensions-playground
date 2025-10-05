import { getOctokit } from "@actions/github";
import * as core from "@actions/core";

export default async ({ github, context, core, fetch }: any) => {
  const prNumber = Number(core.getInput("pr_number") || context.issue.number);
  const [owner, repo] = process.env.GITHUB_REPOSITORY?.split("/") || [];

  try {
    await github.rest.issues.addLabels({
      owner,
      repo,
      issue_number: prNumber,
      labels: ["Approved"]
    });
    core.info(`Added 'Approved' label to PR #${prNumber}`);
  } catch (error) {
    core.error(`Failed to add label: ${error}`);
    core.setFailed(error.message);
  }
};
