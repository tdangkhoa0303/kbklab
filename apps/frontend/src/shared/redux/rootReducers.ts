import {labsReducer, labsUIReducer,} from 'components/CreateClassLabButton/CreateClassLabButton.slice';
import {labAttemptionUIReducer} from 'components/LabAttemption';
import {classesReducer, classesUIReducer,} from 'pages/ClassManagement/ClassesGrid.slice';
import {userLabsReducer} from 'pages/LabDashboard/LabsGrid.slice';
import {lecturersReducer, lecturersUIReducer,} from 'pages/LecturerManagement/LecturesGrid.slice';
import {playgroundsReducer, playgroundsUIReducer} from 'pages/PracticePlayground/PlaygroundGrid.slice';
import {CombinedState, combineReducers, Reducer} from 'redux';

const uiReducer = combineReducers({
  lecturers: lecturersUIReducer,
  classes: classesUIReducer,
  labs: labsUIReducer,
  labAttemption: labAttemptionUIReducer,
  playgrounds: playgroundsUIReducer,
});

const entitiesReducer = combineReducers({
  userLabs: userLabsReducer,
  lecturers: lecturersReducer,
  classes: classesReducer,
  labs: labsReducer,
  playgrounds: playgroundsReducer,
});

const rootReducer: Record<string, Reducer> = {
  ui: uiReducer,
  entities: entitiesReducer,
};

export type UIState = ReturnType<typeof uiReducer>;
export type EntitiesState = ReturnType<typeof entitiesReducer>;
export type RootState = ReturnType<
  Reducer<
    CombinedState<{
      ui: UIState;
      entities: EntitiesState;
    }>
  >
>;
export default rootReducer;
