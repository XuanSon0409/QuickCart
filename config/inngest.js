import { Inngest } from "inngest";
import connectDB from "./db";
import User from "@/models/User";

// Tạo một máy khách để gửi và nhận sự kiện
export const inngest = new Inngest({ id: "quickcart-next" });

//Hàm Inngest để lưu dữ liệu user vào database
export const syncUserCreation = inngest.createFunction(
    {
        id: 'sync-user-from-cleck'
    },
    { event: 'cleck/user.created' },
    async ({ event }) => {
        const { id, first_name, last_name, email_addresses, image_url } = event.data
        const userData = {
            _id: id,
            email: email_addresses[0].email_addresses,
            name: first_name + '' + last_name,
            imageUrl: image_url
        }
        await connectDB
        await User.create(userData)
    }
)

//Hàm Inngest để update dữ liệu user vào database
export const syncUserUpdatetion = inngest.createFunction(
    {
        id: 'update-user-from-cleck'
    },
    { event: 'cleck/user.updated' },
    async ({ event }) => {
        const { id, first_name, last_name, email_addresses, image_url } = event.data
        const userData = {
            _id: id,
            email: email_addresses[0].email_addresses,
            name: first_name + '' + last_name,
            imageUrl: image_url
        }
        await connectDB
        await User.findByIdAndUpdate(id,userData)
    }
)

//Hàm Inngest để xoas dữ liệu user vào database
export const syncUserDeletion = inngest.createFunction(
    {
        id: 'delete-user-from-cleck'
    },
    { event: 'cleck/user.deleted' },
    async ({ event }) => {
        
        const { id } = event.data
        
        await connectDB
        await User.findByIdAndDelete(id)
    }
)