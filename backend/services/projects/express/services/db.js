const sqlite3 = require('sqlite3')
const { AsyncDatabase } = require('promised-sqlite3')

const db = new AsyncDatabase(new sqlite3.Database(':memory:'));

(async () => {

    await db.run(`
        CREATE TABLE IF NOT EXISTS project
        (
            id                TEXT NOT NULL PRIMARY KEY,
            name              TEXT NOT NULL,
            comment           TEXT,
            default_branch_id TEXT,

            CONSTRAINT uc_name UNIQUE (name)
        )
    `)

    await db.run(`
        CREATE TABLE snapshot
        (
            id         TEXT NOT NULL PRIMARY KEY,
            branch_id  TEXT NOT NULL,
            data       TEXT NOT NULL,
            comment    TEXT,
            created_by TEXT NOT NULL,
            created_at TEXT NOT NULL
        )
    `)

    await db.run(`
        CREATE TABLE IF NOT EXISTS branch
        (
            id         TEXT NOT NULL PRIMARY KEY,
            project_id TEXT NOT NULL,
            name       TEXT NOT NULL,
        
            CONSTRAINT uc_project_branch_name UNIQUE (project_id, name)
        )    
    `)

    await db.run(`INSERT INTO project (id, name, comment) VALUES("b606c1cd-98c0-43df-b786-07877892e7ae", "Sphero Mini", "A tiny robotic ball you can program to perform tricks")`)
    await db.run(`INSERT INTO project (id, name, comment) VALUES("1b727e55-b61b-4163-a7e7-197cbba4abd4", "Piano Gloves", "Gloves with programmable sensors to play music by waving your hands")`)
    await db.run(`INSERT INTO project (id, name, comment) VALUES("a676f6d4-c24f-43ae-911f-fb74ce669f6c", "Dancing Robot Kit", "A robot kit that can dance to your programmed choreography")`)
    await db.run(`INSERT INTO project (id, name, comment) VALUES("b92a9976-6b53-4e4c-9f13-c19a835f12e9", "Voice-Activated Coffee Maker", "Control your coffee with your voice for a laugh in the morning")`)
    await db.run(`INSERT INTO project (id, name, comment) VALUES("8042f155-fe99-497f-a181-49969bd48fd3", "Talking Toilet Paper Holder", "Record funny messages for bathroom guests")`)
    await db.run(`INSERT INTO project (id, name, comment) VALUES("4f674b11-f8d5-4250-89f9-c89724989a75", "Musical Plant Pot", "A pot that plays music based on the plant's health")`)
    await db.run(`INSERT INTO project (id, name, comment) VALUES("6e6d290c-10d9-4b25-a37b-97cb3d153de9", "Smart Fridge Magnets", "Programmable magnets to leave messages or create pixel art on your fridge")`)
    await db.run(`INSERT INTO project (id, name, comment) VALUES("85d59cb7-998b-408e-b5f9-927d983c2731", "Bluetooth-Enabled Umbrella", "Get weather updates and play tunes through your umbrella")`)
    await db.run(`INSERT INTO project (id, name, comment) VALUES("3ec0daa4-ea2b-4b1f-89a9-44ebe21c25f8", "USB Pet Rock", "A USB-powered 'pet' rock that does nothing but looks funny")`)
    await db.run(`INSERT INTO project (id, name, comment) VALUES("2d63bfb3-e60a-4d78-896d-d31beba82f5b", "Smart Trash Can", "A trash can that opens when you wave your hand, making it look like it's magic")`)
    await db.run(`INSERT INTO project (id, name, comment) VALUES("ab88cd1f-a453-42cb-908c-3b8d7d0fc384", "Annoy-a-tron", "A small device that emits random annoying sounds at intervals")`)
    await db.run(`INSERT INTO project (id, name, comment) VALUES("01107d39-d335-4f5c-a4fa-bf01a120ac5c", "Cup Noodle USB Warmer", "Keeps your cup noodles warm while plugged into your computer")`)
    await db.run(`INSERT INTO project (id, name, comment) VALUES("3678ec80-851b-4da7-83d0-2e9facc48838", "Pet Cam", "A remote-controlled camera that dispenses treats for your pet")`)
    await db.run(`INSERT INTO project (id, name, comment) VALUES("4be0a77d-a7e6-4728-82dc-837ac19a0bbd", "Musical Tesla Coil Kit", "A kit to create your own musical lightning show")`)
    await db.run(`INSERT INTO project (id, name, comment) VALUES("4b2fe6ed-2302-4790-98ec-0da8fa182dab", "Robot Bartender", "A robot that mixes and serves drinks based on your input")`)
    await db.run(`INSERT INTO project (id, name, comment) VALUES("6ca8a625-5096-467f-bd01-5096b5b00936", "Self-Stirring Mug", "A mug with a built-in stirrer for lazy coffee drinkers")`)
    await db.run(`INSERT INTO project (id, name, comment) VALUES("765bc85b-9574-4db0-9828-9c6401b0d840", "Virtual Reality Prank Glasses", "Display unexpected images or videos in someone's VR headset")`)
    await db.run(`INSERT INTO project (id, name, comment) VALUES("572992a6-808a-4962-83fa-2c0286bbcb2f", "Farting Pillow", "A pillow that makes farting sounds when you sit on it")`)
    await db.run(`INSERT INTO project (id, name, comment) VALUES("f1c65348-2564-4fca-bae1-e7a72a42ba42", "Programmable LED Face Mask", "Create dynamic light patterns on your face mask")`)
    await db.run(`INSERT INTO project (id, name, comment) VALUES("93aa686c-aa6d-4198-9b80-0b72816b3063", "Miniature Desktop Bowling Alley", "A tiny, programmable bowling game for your desk")`)
    await db.run(`INSERT INTO project (id, name, comment) VALUES("3ff34e71-c3c7-487b-b3c6-65507b819ae4", "Talking Alarm Clock", "An alarm clock that tells jokes or fun facts to wake you up")`)
    await db.run(`INSERT INTO project (id, name, comment) VALUES("575171a3-cf5e-471d-924a-32f18476e634", "Smart Toilet Paper Holder", "Monitor toilet paper usage and reorder automatically")`)
    await db.run(`INSERT INTO project (id, name, comment) VALUES("05b94129-7c15-4be0-a50b-756b2dc153dd", "Animated GIF Tie", "Wear a tie that displays animated GIFs")`)
    await db.run(`INSERT INTO project (id, name, comment) VALUES("4802e7a8-4c6c-4cf3-ae35-7319626880db", "Smart Alarm Clock Rug", "To turn off the alarm, you must get out of bed and stand on it")`)
    await db.run(`INSERT INTO project (id, name, comment) VALUES("45ee0e57-33ce-46ec-a56f-5de1cac58266", "Rubik's Cube Solver Robot", "A robot that can solve a Rubik's Cube in seconds")`)

    await db.run(`INSERT INTO branch (id, project_id, name) VALUES("8f7c8ecf-c65c-49ec-b6a1-04a82d368318", "05b94129-7c15-4be0-a50b-756b2dc153dd", "master")`)
    await db.run(`UPDATE project SET default_branch_id = "8f7c8ecf-c65c-49ec-b6a1-04a82d368318" WHERE id = "05b94129-7c15-4be0-a50b-756b2dc153dd"`)
    await db.run(`INSERT INTO branch (id, project_id, name) VALUES("a935eeaf-a5f2-4dde-b425-c19ad3517fba", "05b94129-7c15-4be0-a50b-756b2dc153dd", "development")`)

    await db.run(`INSERT INTO snapshot (id, branch_id, data, comment, created_by, created_at) VALUES("31918c4b-deed-4566-b01e-19bb47d0b932", "8f7c8ecf-c65c-49ec-b6a1-04a82d368318", "Some data", "Initial snapshot", "<unknown>", "2023-10-31T10:37:57.783Z")`)
    await db.run(`INSERT INTO snapshot (id, branch_id, data, comment, created_by, created_at) VALUES("75f1278a-b915-4851-9a8d-2efc8eb5e12f", "8f7c8ecf-c65c-49ec-b6a1-04a82d368318", "Some data (updated)", null, "<unknown>", "2023-10-31T10:48:32.284Z")`)
    await db.run(`INSERT INTO snapshot (id, branch_id, data, comment, created_by, created_at) VALUES("cfb5b3eb-ab57-41a7-a526-0c138ce9113a", "a935eeaf-a5f2-4dde-b425-c19ad3517fba", "Loads of data", "Not for production use", "<unknown>", "2023-10-31T10:44:47.754Z")`)
})()

module.exports = db