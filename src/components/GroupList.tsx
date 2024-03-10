import React, { useState } from 'react';
import { User, Group as GroupType } from "../types";

import {
  AppRoot,
  SplitLayout,
  SplitCol,
  View,
  Panel,
  PanelHeader,
  Header,
  Group,
  SimpleCell,
  usePlatform,
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

interface GroupListProps {
  groups: GroupType[];
}

const GroupList: React.FC<GroupListProps> = ({ groups }) => {
  const platform = usePlatform();
  const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null);

  const handleFriendsClick = (groupId: number) => {
    if  (selectedGroupId === groupId) {
      setSelectedGroupId(null);
    }
    else {
      setSelectedGroupId(groupId);
    }
    
  }

  const getFriendsByGroupId = (groupId: number): User[] | undefined => {
    const group = groups.find(group => group.id === groupId);
    return group?.friends;
  }

  return (
    <AppRoot>
      <SplitLayout header={platform !== 'vkcom' && <PanelHeader delimiter="none" />}>
        <SplitCol autoSpaced>
          <View activePanel="main">
            <Panel id="main">
              <PanelHeader>VK Сообщества</PanelHeader>
              {groups.map((group) => (
                <Group key={group.id} header={<Header mode="secondary">{group.name}</Header>}>
                  {group.avatar_color && (
                    <div
                      style={{
                        width: '100px',
                        height: '100px',
                        borderRadius: '50%',
                        backgroundColor: group.avatar_color,
                        marginBottom: '10px',
                      }}
                    />
                  )}
                  <SimpleCell>Приватность: {group.closed ? 'Закрытая' : 'Открытая'}</SimpleCell>
                  <SimpleCell>Участники: {group.members_count}</SimpleCell>
                  {group.friends && (
                    <SimpleCell onClick={() => handleFriendsClick(group.id)}>
                      Показать друзей
                    </SimpleCell>
                  )}
                  {selectedGroupId === group.id && (
                    <div>
                      {getFriendsByGroupId(group.id)?.map((friend, index) => (
                        <SimpleCell key={index}>{friend.first_name} {friend.last_name}</SimpleCell>
                      ))}
                    </div>
                  )}
                </Group>
              ))}
            </Panel>
          </View>
        </SplitCol>
      </SplitLayout>
    </AppRoot>
  );
};

export default GroupList;
