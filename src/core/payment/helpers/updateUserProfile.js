import { UserProfile } from "../../../data/models"

export async function updateUserProfile(userId, rzpCustId) {
  const profile = await UserProfile.update(
    {
      rzpCustId,
    },
    {
      where: {
        userId,
      },
    }
  )

  return {
    status: profile ? "updated" : "failed to update the profile",
  }
}
