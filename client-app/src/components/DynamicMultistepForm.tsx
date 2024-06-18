import React, { useEffect, useRef } from 'react'
import { Stepper, StepperChangeEvent, StepperRefAttributes } from 'primereact/stepper';
import { StepperPanel } from 'primereact/stepperpanel';
import { Form, FormGroup } from '../form/api';
import DynamicForm from './DynamicForm';


interface DynamicMultistepFormProps {
    form: Form
    formData: any[]
    onFormGroupChanged: (groupIndex: number) => void
    onFormDataChanged: (data: any, index: number) => void
}



export default function DynamicMultistepForm({form, onFormGroupChanged, onFormDataChanged, formData}: DynamicMultistepFormProps) {
    const stepperRef = useRef<StepperRefAttributes>(null);

    const onStepperChange = (event: StepperChangeEvent) => {
       onFormGroupChanged(event.index);
    }

    const onFormChanged = (data: any, idx: number) => {
        onFormDataChanged(data, idx);
    }

    return (
    <div className="rounded m-3 p-5" style={{backgroundColor: 'rgb(255 255 255 / 70%)'}}>
        <Stepper ref={stepperRef} orientation='vertical' onChangeStep={onStepperChange}>
            {form.groups.map((group, idx) => (
                <StepperPanel key={group.name} header={group.name}>
                    <DynamicForm formGroup={group} onChange={(data) => onFormChanged(data, idx)} formData={formData[idx]}/>
                </StepperPanel>
            ))}
        </Stepper>
    </div>
    )
}

