import { LightningElement,wire,track ,api} from 'lwc';
import fetchRecords from '@salesforce/apex/Form3Controller.fetchRecords';
//import { NavigationMixin } from 'lightning/navigation';
//import { updateRecord } from "lightning/uiRecordApi";
//import ID_FIELD from "@salesforce/schema/Form3__c.Id";
import NAME_FIELD from "@salesforce/schema/Form3__c.Name";
import SUBTITLE_FIELD from "@salesforce/schema/Form3__c.SubTitle__c";
import SUBJECT_FIELD from "@salesforce/schema/Form3__c.Subject__c";
import {ShowToastEvent} from 'lightning/platformShowToastEvent'
export default class Form3Test extends LightningElement {
    @track item
    @track isEditForm = false;
    @track customFormModal = false;
    @track currentRecordId;
    @api recordId;
    @api Form3__c;
    fields = [NAME_FIELD, SUBTITLE_FIELD, SUBJECT_FIELD];
    @wire(fetchRecords) item({error,data}){
        if(data){
            this.item=data;
        }
        else if(error){
            this.error=error;
            this.item=undefined;
        }
    }
    editCurrentRecord(currentRow) {
        console.log(JSON.stringify(currentRow));
        this.customFormModal = true;
        this.isEditForm = true;
        // assign record id to the record edit form
        this.currentRecordId = currentRow;
        console.log(this.currentRecordId);
    }
    handleForm(){
        this.editCurrentRecord();
    }
    closeModal() {
        this.customFormModal = false;
    }
    handleSubmit(event) {
        // prevending default type sumbit of record edit form
        //event.preventDefault();
        const fields=event.detail.fields;
        this.template.querySelector('lightning-record-edit-form').submit(fields);
        this.customFormModal = false;
        this.dispatchEvent(new ShowToastEvent({
            title: 'Success',
            message: 'Contact updated Successfully.',
            variant: 'success'
        }));
    }
}