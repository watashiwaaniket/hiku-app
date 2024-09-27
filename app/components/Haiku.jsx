"use client"

import { CldImage } from 'next-cloudinary';
import Link from "next/link"
import { deleteHaiku } from "../../actions/haikuController"

export default function Haiku(props) {
    return (
        <div className='relative rounded-xl overflow-hidden max-w-[650px] mx-auto mb-7'>
            <CldImage
                width="650"
                height="300"
                fillBackground
                crop={{type: "pad", source: true}}
                sizes="650px"
                src={props.haiku.photo}
                alt="Description of my image"
                overlays={[{
                    position: {
                        x: 34,
                        y: 154,
                        angle: -10,
                        gravity: "north_west"
                    },
                    text: {
                        color: "black",
                        fontFamily: "Source Sans Pro",
                        fontSize: 42,
                        fontWeight: "bold",
                        text: `${props.haiku.line1}%0A${props.haiku.line2}%0A${props.haiku.line3}`
                    }
                },{
                    position: {
                        x: 30,
                        y: 150,
                        angle: -10,
                        gravity: "north_west"
                    },
                    text: {
                        color: "white",
                        fontFamily: "Source Sans Pro",
                        fontSize: 42,
                        fontWeight: "bold",
                        text: `${props.haiku.line1}%0A${props.haiku.line2}%0A${props.haiku.line3}`
                    }
                }]}
            />
            <div className="absolute bottom-2 right-2 flex">
                <Link href={`/edit-haiku/${props.haiku._id.toString()}`}>Edit</Link>
                <form action={deleteHaiku}>
                    <input type="hidden" name="id" defaultValue={props.haiku._id.toString()} />
                    <button>Delete</button>
                </form>
            </div>
        </div>
    )
};
