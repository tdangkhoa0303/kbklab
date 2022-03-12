import noop from 'lodash/noop';
import {ConfirmationModalState} from './ConfirmationModal.types';

export const confirmationModalInitialState: ConfirmationModalState = {
	title: '',
	content: '',
	cancelText: 'Cancel',
	confirmText: 'Confirm',
	onConfirm: noop,
}
