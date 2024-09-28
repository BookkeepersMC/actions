import { context } from "@actions/github";
import { RestEndpointMethods } from "@octokit/plugin-rest-endpoint-methods/dist-types/generated/method-types";

const labels: { [label: string]: string } = {
  support:
    "👋 We use the issue tracker exclusively for final bug reports and feature requests. However, this issue appears to be better suited for a [discussion thread](https://github.com/orgs/BookkeepersMC/discussions). Please post your request on there, and the conversation can continue there.",
};

export async function labeled(github: RestEndpointMethods, label: string) {
  if (!labels[label]) {
    return;
  }

  const owner = context.repo.owner;
  const repo = context.repo.repo;
  const issue_number = context.issue.number;

  await github.issues.createComment({
    owner,
    repo,
    issue_number,
    body: labels[label],
  });

  await updateState(github, "closed");
}

export async function unlabeled(github: RestEndpointMethods, label: string) {
  if (!labels[label]) {
    return;
  }

  await updateState(github, "open");
}

async function updateState(
  github: RestEndpointMethods,
  state: "open" | "closed",
) {
  const owner = context.repo.owner;
  const repo = context.repo.repo;
  const issue_number = context.issue.number;

  const issue = await github.issues.get({
    owner,
    repo,
    issue_number,
  });

  if (issue.data.state == state) {
    // Do nothing
    return;
  }

  await github.issues.update({
    owner,
    repo,
    issue_number,
    state: state,
    ...(state == "closed" ? { state_reason: "not_planned" } : {}),
  });
}
