import { TaggedImage, JobProgress, SyncStatus } from "farmbot";
import { NetworkState } from "../../connectivity/interfaces";
import { TimeSettings } from "../../interfaces";
import { UserEnv } from "../../devices/interfaces";
import { GetWebAppConfigValue } from "../../config_storage/actions";

export interface ImageFlipperProps {
  onFlip(uuid: string | undefined): void;
  images: TaggedImage[];
  currentImage: TaggedImage | undefined;
  currentImageSize: Record<"height" | "width", number | undefined>;
  dispatch: Function;
  getConfigValue: GetWebAppConfigValue;
  env: UserEnv;
  crop: boolean;
  transformImage: boolean;
}

export interface ImageFlipperState {
  disablePrev: boolean;
  disableNext: boolean;
}

export interface FlipperImageProps {
  image: TaggedImage;
  crop: boolean;
  transformImage: boolean;
  dispatch: Function;
  getConfigValue: GetWebAppConfigValue;
  env: UserEnv;
  onImageLoad(img: HTMLImageElement): void;
}

export interface FlipperImageState {
  isLoaded: boolean;
  width: number | undefined;
  height: number | undefined;
}

export interface PhotosProps {
  dispatch: Function;
  images: TaggedImage[];
  flags: ImageShowFlags;
  currentImage: TaggedImage | undefined;
  currentImageSize: Record<"height" | "width", number | undefined>;
  timeSettings: TimeSettings;
  imageJobs: JobProgress[];
  botToMqttStatus: NetworkState;
  syncStatus: SyncStatus | undefined;
  env: UserEnv;
  hiddenImages: number[];
  shownImages: number[];
  hideUnShownImages: boolean;
  alwaysHighlightImage: boolean;
  getConfigValue: GetWebAppConfigValue;
}

export interface PhotoButtonsProps {
  takePhoto(): void;
  deletePhoto(): void;
  toggleCrop(): void;
  toggleRotation(): void;
  canCrop: boolean;
  canTransform: boolean;
  imageUrl: string | undefined;
  imageJobs: JobProgress[];
  botToMqttStatus: NetworkState;
  syncStatus: SyncStatus | undefined;
  env: UserEnv;
}

export interface ImageFilterProps {
  image: TaggedImage | undefined;
  dispatch: Function;
  flags: ImageShowFlags;
}

export interface ImageShowProps extends ImageFilterProps {
  size: Record<"height" | "width", number | undefined>;
}

export interface FlagDisplayRowProps {
  flag: boolean;
  labelOk: string;
  labelNo: string;
  title?: string;
}

type FlagKey = "layerOn" | "inRange" | "notHidden" | "zMatch" | "sizeMatch";
export type ImageShowFlags = Record<FlagKey, boolean>;

export interface GetImageShownStatusFlagsProps {
  image: TaggedImage | undefined;
  hiddenImages: number[];
  getConfigValue: GetWebAppConfigValue;
  env: UserEnv;
  size: Record<"width" | "height", number | undefined>;
}

export interface PhotoFooterProps {
  image: TaggedImage | undefined;
  size: Record<"width" | "height", number | undefined>;
  timeSettings: TimeSettings;
  dispatch: Function;
  flags: ImageShowFlags;
}

export interface PhotosState {
  crop: boolean;
  rotate: boolean;
}
