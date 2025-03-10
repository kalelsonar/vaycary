import { UserProfile } from "../../../data/models"

export async function getCustomer(userId) {
  // Find Customer Id from UserProfile
  const profile = await UserProfile.findOne({
    where: {
      userId,
    },
  })

  return profile
}
