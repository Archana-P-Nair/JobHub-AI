import { useEffect, useState } from "react";

import DashboardLayout from "../../components/dashboard/DashboardLayout";

import { candidateNav } from "../../constants/navigation";

import {

getProfile,

updateProfile

} from "../../services/candidateService";

import { toast } from "react-hot-toast";

export default function Profile(){

const [form,setForm]=useState({

name:"",

headline:"",

skills:"",

resume:"",

});

useEffect(()=>{

load();

},[]);

async function load(){

const data=

await getProfile();

setForm({

...data.user,

skills:

data.user.skills.join(", "),

});

}

async function submit(e) {

    e.preventDefault();

    try {

        const fd = new FormData();

        fd.append("name", form.name);
        fd.append("headline", form.headline);

        // Convert comma-separated skills into an array string
        form.skills
            .split(",")
            .map(skill => skill.trim())
            .forEach(skill => fd.append("skills[]", skill));

        if (form.resume) {
            fd.append("resume", form.resume);
        }

        await updateProfile(fd);

        toast.success("Profile Updated");

    } catch (error) {

        console.error(error);

        toast.error("Failed to update profile");

    }

}

return(

<DashboardLayout items={candidateNav}>

<form

onSubmit={submit}

className="max-w-2xl bg-white p-8 rounded-xl shadow"

>

<input

className="input"

placeholder="Name"

value={form.name}

onChange={e=>

setForm({

...form,

name:e.target.value

})

}

/>

<input

className="input mt-4"

placeholder="Headline"

value={form.headline}

onChange={e=>

setForm({

...form,

headline:e.target.value

})

}

/>

<textarea

className="input mt-4"

rows="4"

placeholder="Skills"

value={form.skills}

onChange={e=>

setForm({

...form,

skills:e.target.value

})

}

/>

<input
    type="file"
    accept=".pdf"
    className="input mt-4"
    onChange={(e) =>
        setForm({
            ...form,
            resume: e.target.files[0],
        })
    }
/>

<button

className="bg-blue-600 text-white px-6 py-3 rounded-xl mt-6"

>

Save Profile

</button>

</form>

</DashboardLayout>

);

}