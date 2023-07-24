import {Avatar, Box, Typography} from '@mui/material'
import ChatRowSkeleton from '../../../components/Skeletons/Chat/ChatRowSkeleton'
import {useChat} from '../../../contexts/ChatContext'
import useUserChats from '../../../hooks/useUserChats'
import {ChatRow, ColumnFlexBox} from '../styles'

const ChatList = () => {
  const {userChats, loading: isLoadingChatList} = useUserChats()
  const {setCurrentChatUser} = useChat()

  return (
    <Box>
      {isLoadingChatList ? (
        <ChatRowSkeleton size={6} />
      ) : (
        <>
          {Object.entries(userChats)?.map(chat => (
            <ChatRow
              width={200}
              mb={2}
              key={chat[0]}
              onClick={() => setCurrentChatUser(chat[1].userInfo)}
            >
              <Avatar
                alt={chat[1].userInfo?.displayName}
                src={chat[1].userInfo?.photoURL}
                sx={{width: 50, height: 50, mr: 2}}
              />
              <ColumnFlexBox
                width="100%"
                sx={{
                  overflow: 'hidden',
                }}
              >
                <Typography variant="body1">
                  {chat[1].userInfo?.displayName}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {chat[1].lastMessage?.text}
                </Typography>
              </ColumnFlexBox>
            </ChatRow>
          ))}
        </>
      )}
    </Box>
  )
}

export default ChatList
