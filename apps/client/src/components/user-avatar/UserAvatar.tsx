import React from "react";

import { IonAvatar } from "@ionic/react";

import { useCurrentUser } from "@stores/user";

export const UserAvatar: React.FC<{ className?: string }> = ({ className }) => {
  const { user } = useCurrentUser();

  const src =
    "https://wallpapers-clan.com/wp-content/uploads/2025/04/batman-logo-black-background-desktop-wallpaper-preview.jpg";

  return (
    <IonAvatar className={className}>
      <img
        src={src}
        alt={"User avatar"}
        className="w-full h-full object-cover"
      />
    </IonAvatar>
  );
};

export default UserAvatar;
