import { atomWithStorage } from "jotai/utils";

export type DraftName = string

export enum Acent {
    Low,
    Medium,
    High,
    Parked
}

export enum AllianceColor {
    Red,
    Blue
}

export interface PhaseData {
    /** the amount of pieces scored in lower net */
    lowNet: number,
    /** the amount of pieces scored in high net */
    highNet: number,
    /** the specimens scored in low bar  */
    lowSpecimen: number,
    /** high specimens scored in high bar */
    highSpecimen: number,
    /** the acent the robot ended with */
    acent: Acent,
    /** if the robot has performed a foul move */
    fouled: boolean,
    /** if the robot was disabled during this phase */
    disabled: boolean
}

export interface DraftData {
    /** the team number of the robot */
    team: number,
    /** the color of the alliance */
    color: AllianceColor,
    /** the additional comments scouters can add */
    comments?: string,
    /** the rating for driver */
    driverRating?: 1 | 2 | 3 | 4 | 5,
    /** the rating for defense */
    defenseRating?: 1 | 2 | 3 | 4 | 5,
    /** data for auto phase */
    auto?: PhaseData,
    /** the data for auto phase */
    teleop?: PhaseData,
    /** the data for end phase */
    end?: PhaseData,
    /** the draft name */
    name: string
}

export const draftAtom = atomWithStorage<Array<DraftData>>("drafts", new Array<DraftData>())