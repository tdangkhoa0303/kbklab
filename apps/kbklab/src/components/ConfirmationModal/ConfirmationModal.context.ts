import noop from 'lodash/noop';
import {createContext, useContext} from 'react';
import {confirmationModalInitialState} from './ConfirmationModal.constants';
import {ConfirmationModalState} from './ConfirmationModal.types';

export interface ConfirmationModalContextValues {
	state: ConfirmationModalState;
	setState: (state: ConfirmationModalState) => void;
	showConfirmation: (overriddenState: Partial<ConfirmationModalState>) => void;
}

export const confirmationModalContextDefaultValues: ConfirmationModalContextValues = {
	state: confirmationModalInitialState,
	setState: noop,
	showConfirmation: noop
}

const ConfirmationModalContext = createContext<ConfirmationModalContextValues>(confirmationModalContextDefaultValues);

export const ConfirmationModalContextProvider = ConfirmationModalContext.Provider;

export const useConfirmationModal = (): ConfirmationModalContextValues => useContext(ConfirmationModalContext);
