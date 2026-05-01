"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/is-docker/index.js
function hasDockerEnv() {
  try {
    import_node_fs.default.statSync("/.dockerenv");
    return true;
  } catch {
    return false;
  }
}
function hasDockerCGroup() {
  try {
    return import_node_fs.default.readFileSync("/proc/self/cgroup", "utf8").includes("docker");
  } catch {
    return false;
  }
}
function isDocker() {
  if (isDockerCached === void 0) {
    isDockerCached = hasDockerEnv() || hasDockerCGroup();
  }
  return isDockerCached;
}
var import_node_fs, isDockerCached;
var init_is_docker = __esm({
  "node_modules/is-docker/index.js"() {
    import_node_fs = __toESM(require("node:fs"), 1);
  }
});

// node_modules/is-inside-container/index.js
function isInsideContainer() {
  if (cachedResult === void 0) {
    cachedResult = hasContainerEnv() || isDocker();
  }
  return cachedResult;
}
var import_node_fs2, cachedResult, hasContainerEnv;
var init_is_inside_container = __esm({
  "node_modules/is-inside-container/index.js"() {
    import_node_fs2 = __toESM(require("node:fs"), 1);
    init_is_docker();
    hasContainerEnv = () => {
      try {
        import_node_fs2.default.statSync("/run/.containerenv");
        return true;
      } catch {
        return false;
      }
    };
  }
});

// node_modules/is-wsl/index.js
var import_node_process, import_node_os, import_node_fs3, isWsl, is_wsl_default;
var init_is_wsl = __esm({
  "node_modules/is-wsl/index.js"() {
    import_node_process = __toESM(require("node:process"), 1);
    import_node_os = __toESM(require("node:os"), 1);
    import_node_fs3 = __toESM(require("node:fs"), 1);
    init_is_inside_container();
    isWsl = () => {
      if (import_node_process.default.platform !== "linux") {
        return false;
      }
      if (import_node_os.default.release().toLowerCase().includes("microsoft")) {
        if (isInsideContainer()) {
          return false;
        }
        return true;
      }
      try {
        if (import_node_fs3.default.readFileSync("/proc/version", "utf8").toLowerCase().includes("microsoft")) {
          return !isInsideContainer();
        }
      } catch {
      }
      if (import_node_fs3.default.existsSync("/proc/sys/fs/binfmt_misc/WSLInterop") || import_node_fs3.default.existsSync("/run/WSL")) {
        return !isInsideContainer();
      }
      return false;
    };
    is_wsl_default = import_node_process.default.env.__IS_WSL_TEST__ ? isWsl : isWsl();
  }
});

// node_modules/powershell-utils/index.js
var import_node_process2, import_node_buffer, import_node_util, import_node_child_process, execFile, powerShellPath, executePowerShell;
var init_powershell_utils = __esm({
  "node_modules/powershell-utils/index.js"() {
    import_node_process2 = __toESM(require("node:process"), 1);
    import_node_buffer = require("node:buffer");
    import_node_util = require("node:util");
    import_node_child_process = __toESM(require("node:child_process"), 1);
    execFile = (0, import_node_util.promisify)(import_node_child_process.default.execFile);
    powerShellPath = () => `${import_node_process2.default.env.SYSTEMROOT || import_node_process2.default.env.windir || String.raw`C:\Windows`}\\System32\\WindowsPowerShell\\v1.0\\powershell.exe`;
    executePowerShell = async (command, options = {}) => {
      const {
        powerShellPath: psPath,
        ...execFileOptions
      } = options;
      const encodedCommand = executePowerShell.encodeCommand(command);
      return execFile(
        psPath ?? powerShellPath(),
        [
          ...executePowerShell.argumentsPrefix,
          encodedCommand
        ],
        {
          encoding: "utf8",
          ...execFileOptions
        }
      );
    };
    executePowerShell.argumentsPrefix = [
      "-NoProfile",
      "-NonInteractive",
      "-ExecutionPolicy",
      "Bypass",
      "-EncodedCommand"
    ];
    executePowerShell.encodeCommand = (command) => import_node_buffer.Buffer.from(command, "utf16le").toString("base64");
    executePowerShell.escapeArgument = (value) => `'${String(value).replaceAll("'", "''")}'`;
  }
});

// node_modules/wsl-utils/utilities.js
function parseMountPointFromConfig(content) {
  for (const line of content.split("\n")) {
    if (/^\s*#/.test(line)) {
      continue;
    }
    const match = /^\s*root\s*=\s*(?<mountPoint>"[^"]*"|'[^']*'|[^#]*)/.exec(line);
    if (!match) {
      continue;
    }
    return match.groups.mountPoint.trim().replaceAll(/^["']|["']$/g, "");
  }
}
var init_utilities = __esm({
  "node_modules/wsl-utils/utilities.js"() {
  }
});

// node_modules/wsl-utils/index.js
var import_node_util2, import_node_child_process2, import_promises, execFile2, wslDrivesMountPoint, powerShellPathFromWsl, powerShellPath2, canAccessPowerShellPromise, canAccessPowerShell, wslDefaultBrowser, convertWslPathToWindows;
var init_wsl_utils = __esm({
  "node_modules/wsl-utils/index.js"() {
    import_node_util2 = require("node:util");
    import_node_child_process2 = __toESM(require("node:child_process"), 1);
    import_promises = __toESM(require("node:fs/promises"), 1);
    init_is_wsl();
    init_powershell_utils();
    init_utilities();
    init_is_wsl();
    execFile2 = (0, import_node_util2.promisify)(import_node_child_process2.default.execFile);
    wslDrivesMountPoint = /* @__PURE__ */ (() => {
      const defaultMountPoint = "/mnt/";
      let mountPoint;
      return async function() {
        if (mountPoint) {
          return mountPoint;
        }
        const configFilePath = "/etc/wsl.conf";
        let isConfigFileExists = false;
        try {
          await import_promises.default.access(configFilePath, import_promises.constants.F_OK);
          isConfigFileExists = true;
        } catch {
        }
        if (!isConfigFileExists) {
          return defaultMountPoint;
        }
        const configContent = await import_promises.default.readFile(configFilePath, { encoding: "utf8" });
        const parsedMountPoint = parseMountPointFromConfig(configContent);
        if (parsedMountPoint === void 0) {
          return defaultMountPoint;
        }
        mountPoint = parsedMountPoint;
        mountPoint = mountPoint.endsWith("/") ? mountPoint : `${mountPoint}/`;
        return mountPoint;
      };
    })();
    powerShellPathFromWsl = async () => {
      const mountPoint = await wslDrivesMountPoint();
      return `${mountPoint}c/Windows/System32/WindowsPowerShell/v1.0/powershell.exe`;
    };
    powerShellPath2 = is_wsl_default ? powerShellPathFromWsl : powerShellPath;
    canAccessPowerShell = async () => {
      canAccessPowerShellPromise ??= (async () => {
        try {
          const psPath = await powerShellPath2();
          await import_promises.default.access(psPath, import_promises.constants.X_OK);
          return true;
        } catch {
          return false;
        }
      })();
      return canAccessPowerShellPromise;
    };
    wslDefaultBrowser = async () => {
      const psPath = await powerShellPath2();
      const command = String.raw`(Get-ItemProperty -Path "HKCU:\Software\Microsoft\Windows\Shell\Associations\UrlAssociations\http\UserChoice").ProgId`;
      const { stdout } = await executePowerShell(command, { powerShellPath: psPath });
      return stdout.trim();
    };
    convertWslPathToWindows = async (path2) => {
      if (/^[a-z]+:\/\//i.test(path2)) {
        return path2;
      }
      try {
        const { stdout } = await execFile2("wslpath", ["-aw", path2], { encoding: "utf8" });
        return stdout.trim();
      } catch {
        return path2;
      }
    };
  }
});

// node_modules/define-lazy-prop/index.js
function defineLazyProperty(object, propertyName, valueGetter) {
  const define = (value) => Object.defineProperty(object, propertyName, { value, enumerable: true, writable: true });
  Object.defineProperty(object, propertyName, {
    configurable: true,
    enumerable: true,
    get() {
      const result = valueGetter();
      define(result);
      return result;
    },
    set(value) {
      define(value);
    }
  });
  return object;
}
var init_define_lazy_prop = __esm({
  "node_modules/define-lazy-prop/index.js"() {
  }
});

// node_modules/default-browser-id/index.js
async function defaultBrowserId() {
  if (import_node_process3.default.platform !== "darwin") {
    throw new Error("macOS only");
  }
  const { stdout } = await execFileAsync("defaults", ["read", "com.apple.LaunchServices/com.apple.launchservices.secure", "LSHandlers"]);
  const match = /LSHandlerRoleAll = "(?!-)(?<id>[^"]+?)";\s+?LSHandlerURLScheme = (?:http|https);/.exec(stdout);
  const browserId = match?.groups.id ?? "com.apple.Safari";
  if (browserId === "com.apple.safari") {
    return "com.apple.Safari";
  }
  return browserId;
}
var import_node_util3, import_node_process3, import_node_child_process3, execFileAsync;
var init_default_browser_id = __esm({
  "node_modules/default-browser-id/index.js"() {
    import_node_util3 = require("node:util");
    import_node_process3 = __toESM(require("node:process"), 1);
    import_node_child_process3 = require("node:child_process");
    execFileAsync = (0, import_node_util3.promisify)(import_node_child_process3.execFile);
  }
});

// node_modules/run-applescript/index.js
async function runAppleScript(script, { humanReadableOutput = true, signal } = {}) {
  if (import_node_process4.default.platform !== "darwin") {
    throw new Error("macOS only");
  }
  const outputArguments = humanReadableOutput ? [] : ["-ss"];
  const execOptions = {};
  if (signal) {
    execOptions.signal = signal;
  }
  const { stdout } = await execFileAsync2("osascript", ["-e", script, outputArguments], execOptions);
  return stdout.trim();
}
var import_node_process4, import_node_util4, import_node_child_process4, execFileAsync2;
var init_run_applescript = __esm({
  "node_modules/run-applescript/index.js"() {
    import_node_process4 = __toESM(require("node:process"), 1);
    import_node_util4 = require("node:util");
    import_node_child_process4 = require("node:child_process");
    execFileAsync2 = (0, import_node_util4.promisify)(import_node_child_process4.execFile);
  }
});

// node_modules/bundle-name/index.js
async function bundleName(bundleId) {
  return runAppleScript(`tell application "Finder" to set app_path to application file id "${bundleId}" as string
tell application "System Events" to get value of property list item "CFBundleName" of property list file (app_path & ":Contents:Info.plist")`);
}
var init_bundle_name = __esm({
  "node_modules/bundle-name/index.js"() {
    init_run_applescript();
  }
});

// node_modules/default-browser/windows.js
async function defaultBrowser(_execFileAsync = execFileAsync3) {
  const { stdout } = await _execFileAsync("reg", [
    "QUERY",
    " HKEY_CURRENT_USER\\Software\\Microsoft\\Windows\\Shell\\Associations\\UrlAssociations\\http\\UserChoice",
    "/v",
    "ProgId"
  ]);
  const match = /ProgId\s*REG_SZ\s*(?<id>\S+)/.exec(stdout);
  if (!match) {
    throw new UnknownBrowserError(`Cannot find Windows browser in stdout: ${JSON.stringify(stdout)}`);
  }
  const { id } = match.groups;
  const dotIndex = id.lastIndexOf(".");
  const hyphenIndex = id.lastIndexOf("-");
  const baseIdByDot = dotIndex === -1 ? void 0 : id.slice(0, dotIndex);
  const baseIdByHyphen = hyphenIndex === -1 ? void 0 : id.slice(0, hyphenIndex);
  return windowsBrowserProgIds[id] ?? windowsBrowserProgIds[baseIdByDot] ?? windowsBrowserProgIds[baseIdByHyphen] ?? { name: id, id };
}
var import_node_util5, import_node_child_process5, execFileAsync3, windowsBrowserProgIds, _windowsBrowserProgIdMap, UnknownBrowserError;
var init_windows = __esm({
  "node_modules/default-browser/windows.js"() {
    import_node_util5 = require("node:util");
    import_node_child_process5 = require("node:child_process");
    execFileAsync3 = (0, import_node_util5.promisify)(import_node_child_process5.execFile);
    windowsBrowserProgIds = {
      MSEdgeHTM: { name: "Edge", id: "com.microsoft.edge" },
      // The missing `L` is correct.
      MSEdgeBHTML: { name: "Edge Beta", id: "com.microsoft.edge.beta" },
      MSEdgeDHTML: { name: "Edge Dev", id: "com.microsoft.edge.dev" },
      AppXq0fevzme2pys62n3e0fbqa7peapykr8v: { name: "Edge", id: "com.microsoft.edge.old" },
      ChromeHTML: { name: "Chrome", id: "com.google.chrome" },
      ChromeBHTML: { name: "Chrome Beta", id: "com.google.chrome.beta" },
      ChromeDHTML: { name: "Chrome Dev", id: "com.google.chrome.dev" },
      ChromiumHTM: { name: "Chromium", id: "org.chromium.Chromium" },
      BraveHTML: { name: "Brave", id: "com.brave.Browser" },
      BraveBHTML: { name: "Brave Beta", id: "com.brave.Browser.beta" },
      BraveDHTML: { name: "Brave Dev", id: "com.brave.Browser.dev" },
      BraveSSHTM: { name: "Brave Nightly", id: "com.brave.Browser.nightly" },
      FirefoxURL: { name: "Firefox", id: "org.mozilla.firefox" },
      OperaStable: { name: "Opera", id: "com.operasoftware.Opera" },
      VivaldiHTM: { name: "Vivaldi", id: "com.vivaldi.Vivaldi" },
      "IE.HTTP": { name: "Internet Explorer", id: "com.microsoft.ie" }
    };
    _windowsBrowserProgIdMap = new Map(Object.entries(windowsBrowserProgIds));
    UnknownBrowserError = class extends Error {
    };
  }
});

// node_modules/default-browser/index.js
async function defaultBrowser2() {
  if (import_node_process5.default.platform === "darwin") {
    const id = await defaultBrowserId();
    const name = await bundleName(id);
    return { name, id };
  }
  if (import_node_process5.default.platform === "linux") {
    const { stdout } = await execFileAsync4("xdg-mime", ["query", "default", "x-scheme-handler/http"]);
    const id = stdout.trim();
    const name = titleize(id.replace(/.desktop$/, "").replace("-", " "));
    return { name, id };
  }
  if (import_node_process5.default.platform === "win32") {
    return defaultBrowser();
  }
  throw new Error("Only macOS, Linux, and Windows are supported");
}
var import_node_util6, import_node_process5, import_node_child_process6, execFileAsync4, titleize;
var init_default_browser = __esm({
  "node_modules/default-browser/index.js"() {
    import_node_util6 = require("node:util");
    import_node_process5 = __toESM(require("node:process"), 1);
    import_node_child_process6 = require("node:child_process");
    init_default_browser_id();
    init_bundle_name();
    init_windows();
    init_windows();
    execFileAsync4 = (0, import_node_util6.promisify)(import_node_child_process6.execFile);
    titleize = (string) => string.toLowerCase().replaceAll(/(?:^|\s|-)\S/g, (x) => x.toUpperCase());
  }
});

// node_modules/is-in-ssh/index.js
var import_node_process6, isInSsh, is_in_ssh_default;
var init_is_in_ssh = __esm({
  "node_modules/is-in-ssh/index.js"() {
    import_node_process6 = __toESM(require("node:process"), 1);
    isInSsh = Boolean(import_node_process6.default.env.SSH_CONNECTION || import_node_process6.default.env.SSH_CLIENT || import_node_process6.default.env.SSH_TTY);
    is_in_ssh_default = isInSsh;
  }
});

// node_modules/open/index.js
var open_exports = {};
__export(open_exports, {
  apps: () => apps,
  default: () => open_default,
  openApp: () => openApp
});
function detectArchBinary(binary) {
  if (typeof binary === "string" || Array.isArray(binary)) {
    return binary;
  }
  const { [arch]: archBinary } = binary;
  if (!archBinary) {
    throw new Error(`${arch} is not supported`);
  }
  return archBinary;
}
function detectPlatformBinary({ [platform]: platformBinary }, { wsl } = {}) {
  if (wsl && is_wsl_default) {
    return detectArchBinary(wsl);
  }
  if (!platformBinary) {
    throw new Error(`${platform} is not supported`);
  }
  return detectArchBinary(platformBinary);
}
var import_node_process7, import_node_path, import_node_url, import_node_child_process7, import_promises2, import_meta, fallbackAttemptSymbol, __dirname, localXdgOpenPath, platform, arch, tryEachApp, baseOpen, open, openApp, apps, open_default;
var init_open = __esm({
  "node_modules/open/index.js"() {
    import_node_process7 = __toESM(require("node:process"), 1);
    import_node_path = __toESM(require("node:path"), 1);
    import_node_url = require("node:url");
    import_node_child_process7 = __toESM(require("node:child_process"), 1);
    import_promises2 = __toESM(require("node:fs/promises"), 1);
    init_wsl_utils();
    init_powershell_utils();
    init_define_lazy_prop();
    init_default_browser();
    init_is_inside_container();
    init_is_in_ssh();
    import_meta = {};
    fallbackAttemptSymbol = /* @__PURE__ */ Symbol("fallbackAttempt");
    __dirname = import_meta.url ? import_node_path.default.dirname((0, import_node_url.fileURLToPath)(import_meta.url)) : "";
    localXdgOpenPath = import_node_path.default.join(__dirname, "xdg-open");
    ({ platform, arch } = import_node_process7.default);
    tryEachApp = async (apps2, opener) => {
      if (apps2.length === 0) {
        return;
      }
      const errors = [];
      for (const app of apps2) {
        try {
          return await opener(app);
        } catch (error) {
          errors.push(error);
        }
      }
      throw new AggregateError(errors, "Failed to open in all supported apps");
    };
    baseOpen = async (options) => {
      options = {
        wait: false,
        background: false,
        newInstance: false,
        allowNonzeroExitCode: false,
        ...options
      };
      const isFallbackAttempt = options[fallbackAttemptSymbol] === true;
      delete options[fallbackAttemptSymbol];
      if (Array.isArray(options.app)) {
        return tryEachApp(options.app, (singleApp) => baseOpen({
          ...options,
          app: singleApp,
          [fallbackAttemptSymbol]: true
        }));
      }
      let { name: app, arguments: appArguments = [] } = options.app ?? {};
      appArguments = [...appArguments];
      if (Array.isArray(app)) {
        return tryEachApp(app, (appName) => baseOpen({
          ...options,
          app: {
            name: appName,
            arguments: appArguments
          },
          [fallbackAttemptSymbol]: true
        }));
      }
      if (app === "browser" || app === "browserPrivate") {
        const ids = {
          "com.google.chrome": "chrome",
          "google-chrome.desktop": "chrome",
          "com.brave.browser": "brave",
          "org.mozilla.firefox": "firefox",
          "firefox.desktop": "firefox",
          "com.microsoft.msedge": "edge",
          "com.microsoft.edge": "edge",
          "com.microsoft.edgemac": "edge",
          "microsoft-edge.desktop": "edge",
          "com.apple.safari": "safari"
        };
        const flags = {
          chrome: "--incognito",
          brave: "--incognito",
          firefox: "--private-window",
          edge: "--inPrivate"
          // Safari doesn't support private mode via command line
        };
        let browser;
        if (is_wsl_default) {
          const progId = await wslDefaultBrowser();
          const browserInfo = _windowsBrowserProgIdMap.get(progId);
          browser = browserInfo ?? {};
        } else {
          browser = await defaultBrowser2();
        }
        if (browser.id in ids) {
          const browserName = ids[browser.id.toLowerCase()];
          if (app === "browserPrivate") {
            if (browserName === "safari") {
              throw new Error("Safari doesn't support opening in private mode via command line");
            }
            appArguments.push(flags[browserName]);
          }
          return baseOpen({
            ...options,
            app: {
              name: apps[browserName],
              arguments: appArguments
            }
          });
        }
        throw new Error(`${browser.name} is not supported as a default browser`);
      }
      let command;
      const cliArguments = [];
      const childProcessOptions = {};
      let shouldUseWindowsInWsl = false;
      if (is_wsl_default && !isInsideContainer() && !is_in_ssh_default && !app) {
        shouldUseWindowsInWsl = await canAccessPowerShell();
      }
      if (platform === "darwin") {
        command = "open";
        if (options.wait) {
          cliArguments.push("--wait-apps");
        }
        if (options.background) {
          cliArguments.push("--background");
        }
        if (options.newInstance) {
          cliArguments.push("--new");
        }
        if (app) {
          cliArguments.push("-a", app);
        }
      } else if (platform === "win32" || shouldUseWindowsInWsl) {
        command = await powerShellPath2();
        cliArguments.push(...executePowerShell.argumentsPrefix);
        if (!is_wsl_default) {
          childProcessOptions.windowsVerbatimArguments = true;
        }
        if (is_wsl_default && options.target) {
          options.target = await convertWslPathToWindows(options.target);
        }
        const encodedArguments = ["$ProgressPreference = 'SilentlyContinue';", "Start"];
        if (options.wait) {
          encodedArguments.push("-Wait");
        }
        if (app) {
          encodedArguments.push(executePowerShell.escapeArgument(app));
          if (options.target) {
            appArguments.push(options.target);
          }
        } else if (options.target) {
          encodedArguments.push(executePowerShell.escapeArgument(options.target));
        }
        if (appArguments.length > 0) {
          appArguments = appArguments.map((argument) => executePowerShell.escapeArgument(argument));
          encodedArguments.push("-ArgumentList", appArguments.join(","));
        }
        options.target = executePowerShell.encodeCommand(encodedArguments.join(" "));
        if (!options.wait) {
          childProcessOptions.stdio = "ignore";
        }
      } else {
        if (app) {
          command = app;
        } else {
          const isBundled = !__dirname || __dirname === "/";
          let exeLocalXdgOpen = false;
          try {
            await import_promises2.default.access(localXdgOpenPath, import_promises2.constants.X_OK);
            exeLocalXdgOpen = true;
          } catch {
          }
          const useSystemXdgOpen = import_node_process7.default.versions.electron ?? (platform === "android" || isBundled || !exeLocalXdgOpen);
          command = useSystemXdgOpen ? "xdg-open" : localXdgOpenPath;
        }
        if (appArguments.length > 0) {
          cliArguments.push(...appArguments);
        }
        if (!options.wait) {
          childProcessOptions.stdio = "ignore";
          childProcessOptions.detached = true;
        }
      }
      if (platform === "darwin" && appArguments.length > 0) {
        cliArguments.push("--args", ...appArguments);
      }
      if (options.target) {
        cliArguments.push(options.target);
      }
      const subprocess = import_node_child_process7.default.spawn(command, cliArguments, childProcessOptions);
      if (options.wait) {
        return new Promise((resolve, reject) => {
          subprocess.once("error", reject);
          subprocess.once("close", (exitCode) => {
            if (!options.allowNonzeroExitCode && exitCode !== 0) {
              reject(new Error(`Exited with code ${exitCode}`));
              return;
            }
            resolve(subprocess);
          });
        });
      }
      if (isFallbackAttempt) {
        return new Promise((resolve, reject) => {
          subprocess.once("error", reject);
          subprocess.once("spawn", () => {
            subprocess.once("close", (exitCode) => {
              subprocess.off("error", reject);
              if (exitCode !== 0) {
                reject(new Error(`Exited with code ${exitCode}`));
                return;
              }
              subprocess.unref();
              resolve(subprocess);
            });
          });
        });
      }
      subprocess.unref();
      return new Promise((resolve, reject) => {
        subprocess.once("error", reject);
        subprocess.once("spawn", () => {
          subprocess.off("error", reject);
          resolve(subprocess);
        });
      });
    };
    open = (target, options) => {
      if (typeof target !== "string") {
        throw new TypeError("Expected a `target`");
      }
      return baseOpen({
        ...options,
        target
      });
    };
    openApp = (name, options) => {
      if (typeof name !== "string" && !Array.isArray(name)) {
        throw new TypeError("Expected a valid `name`");
      }
      const { arguments: appArguments = [] } = options ?? {};
      if (appArguments !== void 0 && appArguments !== null && !Array.isArray(appArguments)) {
        throw new TypeError("Expected `appArguments` as Array type");
      }
      return baseOpen({
        ...options,
        app: {
          name,
          arguments: appArguments
        }
      });
    };
    apps = {
      browser: "browser",
      browserPrivate: "browserPrivate"
    };
    defineLazyProperty(apps, "chrome", () => detectPlatformBinary({
      darwin: "google chrome",
      win32: "chrome",
      // `chromium-browser` is the older deb package name used by Ubuntu/Debian before snap.
      linux: ["google-chrome", "google-chrome-stable", "chromium", "chromium-browser"]
    }, {
      wsl: {
        ia32: "/mnt/c/Program Files (x86)/Google/Chrome/Application/chrome.exe",
        x64: ["/mnt/c/Program Files/Google/Chrome/Application/chrome.exe", "/mnt/c/Program Files (x86)/Google/Chrome/Application/chrome.exe"]
      }
    }));
    defineLazyProperty(apps, "brave", () => detectPlatformBinary({
      darwin: "brave browser",
      win32: "brave",
      linux: ["brave-browser", "brave"]
    }, {
      wsl: {
        ia32: "/mnt/c/Program Files (x86)/BraveSoftware/Brave-Browser/Application/brave.exe",
        x64: ["/mnt/c/Program Files/BraveSoftware/Brave-Browser/Application/brave.exe", "/mnt/c/Program Files (x86)/BraveSoftware/Brave-Browser/Application/brave.exe"]
      }
    }));
    defineLazyProperty(apps, "firefox", () => detectPlatformBinary({
      darwin: "firefox",
      win32: String.raw`C:\Program Files\Mozilla Firefox\firefox.exe`,
      linux: "firefox"
    }, {
      wsl: "/mnt/c/Program Files/Mozilla Firefox/firefox.exe"
    }));
    defineLazyProperty(apps, "edge", () => detectPlatformBinary({
      darwin: "microsoft edge",
      win32: "msedge",
      linux: ["microsoft-edge", "microsoft-edge-dev"]
    }, {
      wsl: "/mnt/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"
    }));
    defineLazyProperty(apps, "safari", () => detectPlatformBinary({
      darwin: "Safari"
    }));
    open_default = open;
  }
});

// src/extension.ts
var extension_exports = {};
__export(extension_exports, {
  activate: () => activate
});
module.exports = __toCommonJS(extension_exports);
var vscode2 = __toESM(require("vscode"));

// src/search.ts
var vscode = __toESM(require("vscode"));
var unity_search_root = "http://docs.unity3d.com/";
var unity_search_path = "ScriptReference/30_search.html";
var unity_search_url = "?q=";
var msft_search = "https://docs.microsoft.com/";
var msft_search_url = "en-us/search/index?search=";
async function openURL(search_base, s) {
  if (search_base === "open") {
    await vscode.env.openExternal(vscode.Uri.parse(s));
  } else {
    var search_blank_url, search_url;
    var local = false;
    var appPath = "";
    if (search_base === "unity") {
      var settings = vscode.workspace.getConfiguration("unity-tools");
      var localPath = settings.get("localDocumentationPath", "");
      if (localPath === "") {
        var documentationVersion = settings.get("documentationVersion", "");
        if (documentationVersion === "") {
          search_blank_url = unity_search_root + unity_search_path;
        } else {
          search_blank_url = unity_search_root + documentationVersion + "/Documentation/" + unity_search_path;
        }
      } else {
        appPath = settings.get("localDocumentationViewer", "");
        search_blank_url = "file:///" + localPath + "/30_search.html";
        local = true;
      }
      search_url = search_blank_url + unity_search_url;
    } else if (search_base === "msft") {
      search_blank_url = msft_search;
      search_url = msft_search + msft_search_url;
    }
    if (!s) {
      s = search_blank_url;
    } else {
      s = search_url + s;
    }
    if (local) {
      const { default: openApp2 } = await Promise.resolve().then(() => (init_open(), open_exports));
      await openApp2(s, { app: { name: appPath } });
    } else {
      await vscode.env.openExternal(vscode.Uri.parse(s));
    }
  }
  return true;
}
function prepareInput(input, start, end) {
  if (start >= end) {
    return "";
  }
  input = input.slice(start, end);
  input = input.trim();
  return input;
}
function openUnityDocs(input, start, end) {
  openURL("unity", prepareInput(input, start, end));
}

// src/directories.ts
var fs6 = __toESM(require("fs"));
function GenerateOrganizationFolders(path2, generationFolders) {
  for (var j = 0; j < generationFolders.length; j++) {
    var dir = path2 + generationFolders[j];
    fs6.mkdir(dir, function(_err) {
    });
  }
}

// src/extension.ts
var fs7 = __toESM(require("fs"));
function openDocErrorMessage(str) {
  return vscode2.window.showErrorMessage("Error: " + str, "Open Docs").then((item) => {
    if (item === "Open Docs") {
      openURL("unity");
    }
  });
}
function activate(context) {
  console.log("Unity Tools extension is now active!");
  var open_docs = vscode2.commands.registerTextEditorCommand(
    "unity-tools.OpenDocs",
    (textEditor, edit) => {
      let selection = textEditor.selection;
      if (!selection.isSingleLine) {
        openDocErrorMessage("Multiple lines selected, please select a single line.");
        return;
      }
      let range = void 0;
      if (!selection.isEmpty) {
        range = new vscode2.Range(selection.start, selection.end);
      } else {
        range = textEditor.document.getWordRangeAtPosition(selection.active);
      }
      if (range === void 0) {
        openDocErrorMessage('Nothing is selected. Please select a class, or use "Search Documentation" instead!');
        return;
      }
      openUnityDocs(textEditor.document.lineAt(range.start.line).text, range.start.character, range.end.character);
    }
  );
  context.subscriptions.push(open_docs);
  var searchUnityDocs = vscode2.commands.registerCommand("unity-tools.SearchDocs", () => {
    vscode2.window.showInputBox({
      prompt: "Search Unity Documentation:"
    }).then((result) => {
      if (result !== void 0) {
        openURL("unity", result);
      }
    });
  });
  context.subscriptions.push(searchUnityDocs);
  var searchMSDocs = vscode2.commands.registerCommand("unity-tools.SearchMSFTDocs", () => {
    vscode2.window.showInputBox({
      prompt: "Search MSFT Documentation:"
    }).then((result) => {
      if (result !== void 0) {
        openURL("msft", result);
      }
    });
  });
  context.subscriptions.push(searchMSDocs);
  var open_vscode_docs = vscode2.commands.registerCommand("unity-tools.OpenVSCodeDocs", () => {
    openURL("open", "https://code.visualstudio.com/Docs/runtimes/unity");
  });
  context.subscriptions.push(open_vscode_docs);
  var create_Directories = vscode2.commands.registerCommand("unity-tools.CreateDirectories", () => {
    vscode2.window.showWorkspaceFolderPick().then((root) => {
      if (root !== void 0) {
        fs7.stat(root.uri.fsPath, (err, stats) => {
          if (err && err.code === "ENOENT") {
            vscode2.window.showErrorMessage("You do not have access or permission to this file on the hard drive.");
          } else if (stats.isDirectory()) {
            var rootPath = root.uri.fsPath + "/Assets/";
            fs7.stat(rootPath, (err2, stats2) => {
              if (err2 && err2.code === "ENOENT") {
                vscode2.window.showErrorMessage("Could not find an Assets Folder in the current workspace of VSCode. Please open the Unity root folder of the project you are working on.");
              } else if (err2) {
                vscode2.window.showErrorMessage("Something went wrong while checking Assets folder existence: " + err2);
              } else if (stats2.isDirectory()) {
                var settings = vscode2.workspace.getConfiguration("unity-tools");
                var folderList = settings.get("defaultOrganizationFolders");
                if (folderList === void 0) {
                  vscode2.window.showErrorMessage("Could not load defaultOrganizationFolders setting.");
                } else {
                  GenerateOrganizationFolders(rootPath, folderList);
                  vscode2.window.showInformationMessage("Folders generated successfully");
                }
              }
            });
          }
        });
      } else {
        vscode2.window.showErrorMessage("You do not have a workspace open in VSCode. Please 'Open Folder' to the root folder of a desired Unity Project.");
      }
    });
  });
  context.subscriptions.push(create_Directories);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  activate
});
//# sourceMappingURL=extension.js.map
