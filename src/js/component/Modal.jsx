import React, { useContext } from "react";
import { Context } from '../store/appContext'

const Modal = (props) => {
    const { store, actions } = useContext(Context);
    return (
        <div className="modal fade" id={`modal${props.idx}`} tabIndex="-1" role="dialog" aria-labelledby="Are you sure?" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Are you sure?</h5>
                        <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        Are you sure you want to delete {store.contacts[props.idx].full_name} from your contacts?
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={() => {actions.deleteContact(props.id)}}>Delete</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal