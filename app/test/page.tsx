

async function getUsers(){
    const users = await fetch("http://localhost:3000/api/users");
    return users.json()
}

async function createUser(){
    const userToAdd = {
        id: 3344,
        name: "el hello"
    }

    const newUser = await fetch("http://localhost:3000/api/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userToAdd)
    })
}

async function createListing(){
    const listingToAdd = {
        id: 3683,
        address: "tulare"
    }

    const newListing = await fetch("http://localhost:3000/api/listings", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(listingToAdd)
    })
}

async function getListings(){
    const listings = await fetch("http://localhost:3000/api/listings");
    return listings.json();
}

export default async function UserPage(){
    const users = await getUsers();
    const listings = await getListings();
    return (
        <div className="">
            <p>
                Users: {JSON.stringify(users)}
            </p>
            <div>
                padding
            </div>
            <p>
                Listings: {JSON.stringify(listings)}
            </p>
        </div>
    )
}
