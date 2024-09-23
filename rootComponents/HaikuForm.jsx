"use client"

import {useFormState} from "react-dom"
import { createHaiku, editHaiku } from "../actions/haikuController";

export default function HaikuForm(props) {
  let actualAction

  if(props.action === "create"){
    actualAction = createHaiku
  }
  if(props.action === "edit"){
    actualAction = editHaiku
  }

    const [formState, formAction] = useFormState(actualAction, {});

    return (
        <form action={formAction} className="max-w-xs mx-auto">
            <div className="mb-3">
                <input name="line1" defaultValue={props.haiku?.line1} autoComplete="off" type="text" placeholder="line #1" className="input input-bordered w-full max-w-xs" />
                {formState.errors?.line1 && (
                    <div role="alert" className="alert alert-error">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 shrink-0 stroke-current"
                      fill="none"
                      viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{formState.errors?.line1}</span>
                  </div>
                )} 
            </div>
            <div className="mb-3">
                <input name="line2" defaultValue={props.haiku?.line2} autoComplete="off" type="text" placeholder="line #2" className="input input-bordered w-full max-w-xs" />
                {formState.errors?.line2 && (
                    <div role="alert" className="alert alert-error">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 shrink-0 stroke-current"
                      fill="none"
                      viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{formState.errors?.line2}</span>
                  </div>
                )} 
            </div>
            <div className="mb-3">
                <input name="line3" defaultValue={props.haiku?.line3} autoComplete="off" type="text" placeholder="line #3" className="input input-bordered w-full max-w-xs" />
                {formState.errors?.line3 && (
                    <div role="alert" className="alert alert-error">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 shrink-0 stroke-current"
                      fill="none"
                      viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{formState.errors?.line3}</span>
                  </div>
                )} 
            </div>
            <input type="hidden" name="haikuId" defaultValue={props.haiku?._id.toString()}/>
            <button className="btn btn-primary"> Submit </button>
        </form>
    )
};
