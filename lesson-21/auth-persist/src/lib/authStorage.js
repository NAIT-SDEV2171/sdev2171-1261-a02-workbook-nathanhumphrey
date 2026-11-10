import * as SecureStore from 'expo-secure-store';

const AUTH_SESSION_KEY = 'study_steps_auth_session';

export async function saveAuthSession(session) {
  const value = JSON.stringify(session);
  await SecureStore.setItemAsync(AUTH_SESSION_KEY, value);
}

export async function getStoredAuthSession() {
  const rawValue = await SecureStore.getItemAsync(AUTH_SESSION_KEY);

  if (!rawValue) {
    return null;
  }

  try {
    const parsed = JSON.parse(rawValue);

    if (
      !parsed ||
      typeof parsed !== 'object' ||
      typeof parsed.token !== 'string' ||
      typeof parsed.user !== 'object' ||
      parsed.user === null ||
      typeof parsed.user.id !== 'string' ||
      typeof parsed.user.name !== 'string' ||
      typeof parsed.user.email !== 'string'
    ) {
      return null;
    }

    return {
      token: parsed.token,
      user: {
        id: parsed.user.id,
        name: parsed.user.name,
        email: parsed.user.email,
        createdAt:
          typeof parsed.user.createdAt === 'string'
            ? parsed.user.createdAt
            : undefined,
      },
    };
  } catch {
    return null;
  }
}

export async function clearStoredAuthSession() {
  await SecureStore.deleteItemAsync(AUTH_SESSION_KEY);
}
