import { open } from "https://deno.land/x/opener/mod.ts";
import { branch, remoteUrl } from "./git.ts";
import { parseArgs, transformRemoteUrl } from "./helpers.ts";

const { targetBranch, help } = parseArgs();

if (help) {
  console.log(
    "%cOpen a new merge request in gitlab",
    "font-weight: bold",
  );
  console.log("\n%cEXAMPLE:", "text-decoration: underline");
  console.log("%copen-mr --target main", "color: green");
  console.log("\n%cOPTIONS:", "text-decoration: underline");
  console.log("\t--help");
  console.log("\t\tPrints help information");
  console.log("\t--target");
  console.log("\t\tSets target branch");
}

const sourceBranch = await branch();
const remote = await remoteUrl();
const newMergeRequestUrl = transformRemoteUrl(
  { remoteUrl: remote, sourceBranch, targetBranch },
);

await open(newMergeRequestUrl);
