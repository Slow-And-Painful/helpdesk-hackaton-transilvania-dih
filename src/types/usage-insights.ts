// CHAT INSIGHTS

export type ChatUsageInsights = {
  messagesCount: number
  chatSummaryTokens: number
  systemPromptTokens: number
  inputTokens: number
  outputTokens: number
  systemPrompt: string
}

export type ChatsInsights = {
  totalInputToken: number
  totalOutputToken: number
  totalSystemPromptTokens: number
  totalChatSummaryToken: number
  totalChatMessages: number
}

// USER INSIGHTS

export type UserUsageInsights = {
  chat: ChatsInsights
  // agents: ...
  // other: ...
}


// ORGANIZATION INSIGHTS

export type OrganizationUsageInsights = {
  chat: ChatsInsights
  // agents: ...
  // other: ...
  totalTokenUsed: number
}
