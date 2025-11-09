import React from "react";

import { IonRow } from "@ionic/react";

import { useCurrentUser } from "@stores/user";

export const UserInfo: React.FC = () => {
  const { user } = useCurrentUser();

  return (
    <IonRow className="flex flex-col text-left">
      <span className="text-primary-light font-roboto text-sm">
        {user?.displayName}
      </span>
      <span className="text-gray-400 font-roboto text-xs">Beta</span>
    </IonRow>
  );
};

export default UserInfo;
