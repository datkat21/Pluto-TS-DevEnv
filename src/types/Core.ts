import { HtmlConstructor } from "./Html";
import { GetStringFunction } from "./Lib";
import { Package, PackageLibraryOrComponent } from "./Package";
import {
  AutoGeneratedIcons,
  AutoGeneratedLanguages,
  AutoGeneratedStrings,
} from "./_autoGenerated";
import { WsWindow } from "./lib/WindowSystem";

export interface Core {
  version: number;
  codename: string;
  processList: (Process | null)[];
  knownPackageList: KnownPackageListPackage[];
  setLanguage(lang: any): void;
  startPkg: (url: string, isUrl?: boolean, force?: boolean) => Promise<any>;
  services: CoreService[];
  broadcastEventToProcs: (eventData: EventData) => void;
  windowsList?: WsWindow[];
}

export type randomString = () => string;
export type loadLibraryOrComponent = (
  lib: string
) => unknown | PackageLibraryOrComponent;

export interface GlobalLib {
  getString: GetStringFunction;
  html: HtmlConstructor;
  randomString: randomString;
  loadLibrary: loadLibraryOrComponent;
  loadComponent: loadLibraryOrComponent;
}

export type EventData = CoreEventData;

export type CoreIcons = AutoGeneratedIcons;
export type CoreLanguages = AutoGeneratedLanguages;

export interface CoreDetails {
  version: number;
  versionString: string;
  codename: string;
}

export interface CoreEventData {
  type: "coreEvent";
  data: { type: "pkgStart" | "pkgEnd"; data: Process };
}

export interface WsEventData {
  type: "wsEvent";
  data: { type: "focusedWindow"; data: WsWindow };
}

export type CorePrivilegeId =
  | "startPkg"
  | "processList"
  | "knownPackageList"
  | "services"
  | "setLanguage"
  | "host"
  | "full";

export interface CorePrivilege {
  privilege: CorePrivilegeId;
  description: string;
}

export interface KnownPackageListPackage {
  url: string;
  pkg: Package;
}

export interface CoreService {
  name: string;
  ref: CoreServiceRef;
}

export interface CoreServiceRef {
  name: string;
  description: string;
  [key: string]: any;
}

export interface Process {
  name: string;
  pid: number;
  proc: ProcessProc;
  token: string;
}

export interface TrayInfo {
  icon: string;
}

export interface ProcessProc {
  /**
   * Full name of the running process.
   */
  name: string;
  /**
   * Description of the running process.
   */
  description: string;
  /**
   * If tray info is null, the app will not show in the tray.
   */
  trayInfo: TrayInfo | null;
}
