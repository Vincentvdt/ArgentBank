import { MainContainer, srOnly } from "../../App"
import styled from "styled-components"
import AccountDetail from "../../common/AccountDetail"
import type { User } from "../../services/userApi"
import { useUpdateUserMutation } from "../../services/userApi"
import type React from "react"
import { useState } from "react"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { selectUser, setUser } from "../../features/authSlice"


const UserHeader = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    color: #fff;
    margin-bottom: 2rem;

    h1, h2 {
        margin: 1rem 0 0;
        font-size: 2rem;
        font-weight: 700;
    }

    button {
        border-color: #00bc77;
        background-color: #00bc77;
        color: #fff;
        font-weight: bold;
        padding: 10px;
        cursor: pointer;
        font-size: 0.833rem;
        margin-top: 1rem;
    }
`
const SubtitleSrOnly = styled.h2`${srOnly}`
const UpdateForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 1rem;

    div {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 30px;

        label {
            flex: 1;
            width: 100%;
        }

        input {
            padding: 8px 10px;
            border-radius: 5px;
            border: none;
        }
    }

    button {
        flex: 1
    }
`

const Profile = () => {
  const [editMode, setEditMode] = useState(false)

  const dispatch = useAppDispatch()
  const [updateUser, { isLoading }] = useUpdateUserMutation()

  const user = useAppSelector(selectUser)


  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget

    const formData: Partial<User> = {
      firstName: form["firstName"].value,
      lastName: form["lastName"].value
    }

    try {
      const updatedUser = await updateUser(formData).unwrap()
      dispatch(setUser(updatedUser))
    } catch (error) {
      console.error("Error updating user:", error)
    }
    setEditMode(false)
  }


  if (isLoading || !user) return <div>Loading...</div>

  return (
    <MainContainer $dark={true}>
      <UserHeader>
        <h1>Welcome back</h1>
        {editMode ?
          <>
            <UpdateForm onSubmit={handleSubmit}>
              <div>
                <label>
                  <input
                    name="firstName"
                    placeholder="Prénom"
                    type="text"
                    defaultValue={user.firstName} />
                </label>
                <label>
                  <input
                    name="lastName"
                    placeholder="Nom"
                    type="text"
                    defaultValue={user.lastName} />
                </label>
              </div>
              <button type="submit" onClick={() => setEditMode(true)}>Save changes</button>
            </UpdateForm>
          </> :
          <>
            <h2>{user.firstName} {user.lastName}</h2>
            <button onClick={() => setEditMode(true)}>Edit Name</button>
          </>
        }


      </UserHeader>
      <SubtitleSrOnly>Accounts</SubtitleSrOnly>
      <AccountDetail title="Argent Bank Checking (x8349)" amount={2082.79} description="Available Balance" />
      <AccountDetail title="Argent Bank Savings (x6712)" amount={10928.42} description="Available Balance" />
      <AccountDetail title="Argent Bank Credit Card (x8349)" amount={184.30} description="Current Balance" />
    </MainContainer>
  )
}

export default Profile