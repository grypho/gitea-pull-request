import core from "@actions/core";

import gitea from "gitea-api";



async function run() {
  try {
    const server_url = core.getInput("server_url")
    const name = core.getInput("name")
    const tag_name = core.getInput("tag_name")
    const draft = getIsTrue(core.getInput("draft"))
    const prerelease = getIsTrue(core.getInput("prerelease"))
    const files = core.getInput("files")
    const repository = core.getInput("repository")
    const token = core.getInput("token")
    const target_commitish = core.getInput("target_commitish")
    const md5sum = getIsTrue(core.getInput("md5sum"))
    const sha256sum = getIsTrue(core.getInput("sha256sum"))

    const [owner, repo] = (repository).split("/")

    const gitea_client = new gitea.GiteaApi({
      BASE: `${server_url}/api/v1`,
      WITH_CREDENTIALS: true,
      TOKEN: token,
    });
    

    const pr_opts = {owner, repo, body:{ head:'v1.9_stable', base:'master'}}
    console.log(pr_opts)


    const result = await gitea_client.repository.repoCreatePullRequest(pr_opts)
    console.log(result)

    console.log(`🎉 Release ready at ${response.html_url}`);
  } catch (error) {
    console.log(error);
    core.setFailed(error.message);
  }
}


run()
