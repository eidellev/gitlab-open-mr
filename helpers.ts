import { parse } from "https://deno.land/std@0.119.0/flags/mod.ts";

export interface TransformParams {
  remoteUrl: string;
  sourceBranch: string;
  targetBranch: string;
}

export function transformRemoteUrl(
  params: TransformParams,
) {
  const { remoteUrl, sourceBranch, targetBranch } = params;
  const [organization, team, project] = remoteUrl.replace(
    "git@gitlab.com:",
    "",
  ).replace(".git", "").split("/");

  return `https://gitlab.com/${organization}/${team}/${project}/-/merge_requests/new?merge_request[source_branch]=${sourceBranch}&merge_request[target_branch]=${targetBranch}`;
}

export function getTargetBranch() {
  const { target: targetBranch } = parse(Deno.args, {
    string: ["target"],
    default: { target: "main" },
  });

  return targetBranch;
}
