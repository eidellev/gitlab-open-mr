import { open } from "https://deno.land/x/opener/mod.ts";
import { branch, remoteUrl } from "./git.ts";
import { getTargetBranch, transformRemoteUrl } from "./helpers.ts";

const targetBranch = getTargetBranch();

console.log({ targetBranch });
const sourceBranch = await branch();
const remote = await remoteUrl();
const newMergeRequestUrl = transformRemoteUrl(
  { remoteUrl: remote, sourceBranch, targetBranch },
);

await open(newMergeRequestUrl);
