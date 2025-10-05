import { getOctokit } from "@actions/github";
import * as core from "@actions/core";

async function main() {
  const octokit = getOctokit(process.env.GITHUB_TOKEN || "");
  const prNumber = Number(core.getInput("pr_number"));
  const [owner, repo] = process.env.GITHUB_REPOSITORY?.split("/") || [];

  try {
    await octokit.rest.issues.addLabels({
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
}

main();
