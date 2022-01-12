/**
 * Decodes raw command output
 */
function _decodeOutput(rawOutput: Uint8Array) {
  return new TextDecoder().decode(rawOutput).replaceAll("\n", "");
}

/**
 * Runs
 *
 * @param      {string}   command  The command
 * @return     {Promise<string>} Command output
 */
export async function runGitCommand(command: string) {
  const gitCommand = Deno.run({
    cmd: ["git", ...command.split(" ")],
    stdout: "piped",
    stderr: "piped",
  });

  return _decodeOutput(await gitCommand.output());
}

/**
 * Returns name of current branch
 */
export function branch() {
  return runGitCommand("rev-parse --abbrev-ref HEAD");
}

export function remoteUrl() {
  return runGitCommand("remote get-url origin");
}
