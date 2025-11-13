import React from "react";

import { IonAvatar } from "@ionic/react";

import { useCurrentUser } from "@stores/user";

export const UserAvatar: React.FC<{ className?: string }> = ({ className }) => {
  const { user } = useCurrentUser();

  const src = user?.photoURL;

  return (
    <IonAvatar className={className}>
      <img
        src={src || ""}
        alt={"User avatar"}
        className="w-full h-full object-cover"
      />
    </IonAvatar>
  );
};

export default UserAvatar;
