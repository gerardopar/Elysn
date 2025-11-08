import React from "react";
import { type ModalOptions, type PopoverOptions } from "@ionic/core";
import { useIonPopover, useIonModal } from "@ionic/react";
import useDeviceWidth from "@hooks/useDeviceWidth";

export const DEFAULT_POPOVER_OPTIONS: Partial<PopoverOptions> = {
  side: "top",
  alignment: "center",
  showBackdrop: false,
  arrow: false,
  cssClass: "default-popover",
};

export const DEFAULT_MODAL_OPTIONS: Partial<ModalOptions> = {
  initialBreakpoint: 1,
  breakpoints: [0, 1],
  cssClass: "default-modal",
};

/**
 * Unified modal/popover hook w/ defaults and override support
 */
export const useModal = <P extends object = {}>(
  Component: React.ComponentType<P>,
  props: P,
  options?: {
    popoverOptions?: Partial<PopoverOptions>;
    modalOptions?: Partial<ModalOptions>;
  }
) => {
  const { isMobile } = useDeviceWidth();

  const [presentPopover, dismissPopover] = useIonPopover(Component, props);
  const [presentModal, dismissModal] = useIonModal(Component, props);

  const mergedPopoverOpts = {
    ...DEFAULT_POPOVER_OPTIONS,
    ...options?.popoverOptions,
  };
  const mergedModalOpts = {
    ...DEFAULT_MODAL_OPTIONS,
    ...options?.modalOptions,
  };

  const open = (e?: React.MouseEvent) => {
    if (isMobile) {
      presentModal(mergedModalOpts);
    } else {
      presentPopover({
        event: e?.nativeEvent,
        ...mergedPopoverOpts,
      });
    }
  };

  const close = () => (isMobile ? dismissModal() : dismissPopover());

  return { open, close };
};

export default useModal;
