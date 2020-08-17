import React, { useState, useEffect } from 'react'
import MyTable from './components/MyTable'
import MyModal from './components/MyModal'
import UserForm from './components/UserForm'

import axios from 'axios'

function Users() {

    let [users, setUsers] = useState([])
    let [offset, setOffset] = useState(0)
    let [perPage] = useState(15)
    let [currentPage, setCurrentPage] = useState(0)

    useEffect(() => {
        axios.get(`https://randomuser.me/api/?results=100`)
            .then(res => {
                console.log(res.data.results)
                setUsers(res.data.results)
            })
    }, [])

    const slice = users.slice(offset, offset + perPage)

    let tableValues = {
        firstNames: [],
        lastName: [],
        ages: [],
        username: [],
        emails: [],
    }

    slice.map((user) => {
        tableValues.firstNames.push(user.name.first)
        tableValues.lastName.push(user.name.last)
        tableValues.ages.push(user.dob.age)
        tableValues.username.push(`${user.name.first}.${user.name.last}${user.dob.age}`)
        tableValues.emails.push(user.email)
    })

    const tableContent = [
        {
            id: 'FIRST_NAME',
            label: 'First Name',
            values: tableValues.firstNames
        },
        {
            id: 'LAST_NAME',
            label: 'Last Name',
            values: tableValues.firstNames
        },
        {
            id: 'AGE',
            label: 'Age',
            values: tableValues.ages
        },
        {
            id: 'USERNAME',
            label: 'Username',
            values: tableValues.username
        },
        {
            id: 'EMAIL',
            label: 'Email',
            values: tableValues.emails
        }
    ]

    const addNewUser = (user) => {

        setUsers([...users, user]);
        // console.log(user)
    }

    return (
        <React.Fragment>
            <MyModal title={'Create new User'} content={<UserForm addUser={addNewUser} />} />
            <MyTable
                size='medium'
                tableContent={tableContent}
                wrapText={true}
                page={currentPage}
                rowsCount={users.length}
                pagination={true}
                nextPage={() => {
                    let selectedPage = currentPage + 1
                    let nextOffset = selectedPage * perPage
                    if (nextOffset >= users.length) {
                        selectedPage = currentPage
                    }
                    setCurrentPage(selectedPage)
                    setOffset(selectedPage * perPage)
                }}
                previewsPage={() => {
                    const selectedPage =
                        currentPage === 0 ? currentPage : currentPage - 1

                    setCurrentPage(selectedPage)
                    setOffset(selectedPage * perPage)
                }}
            />
        </React.Fragment>
    )
}

export default Users