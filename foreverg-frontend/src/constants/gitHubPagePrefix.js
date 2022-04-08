//local empty string below

import { isTestingLocally } from "../myConfig";

//remote /ForeverG-frontend
export const GITHUB_PREFIX = isTestingLocally? "" : "/ForeverG-frontend";
