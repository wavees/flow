import { readable, writable } from 'svelte/store';

const general =
readable({
  // Site url
  // Hmm, just site url, isn't it?
  globalURL: "wavees.ml",
  currentURL: "blog.wavees.ml",

  account: {
    permissions: [
      "readEmail",
      "ideas/viewPolls",
      "ideas/createPolls",
      "ideas/managePolls",
      "ideas/deletePolls",
      "ideas/viewStatistics",
      "ideas/accountSettings"
    ]
  }
});

export { general };