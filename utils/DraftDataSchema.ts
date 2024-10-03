import { Acent, AllianceColor, DraftData } from "@/store/drafts";

/** 
 * A utiltiy function that constructs draft data. If there is a macro
 * that does this job, please delete this utiltiy function and open a
 * issue. I hate doing this.
 */
export function DraftDataScehema(name: string, team: number, color: AllianceColor): DraftData {
    return {
        auto: {acent: Acent.High, disabled: false, fouled: false, highNet: 0, highSpecimen: 0, lowNet: 0, lowSpecimen: 0, net: 0},
        teleop: {acent: Acent.High, disabled: false, fouled: false, highNet: 0, highSpecimen: 0, lowNet: 0, lowSpecimen: 0, net: 0},
        end: {acent: Acent.High, disabled: false, fouled: false, highNet: 0, highSpecimen: 0, lowNet: 0, lowSpecimen: 0, net: 0},
        color: color,
        comments: "",
        defenseRating: 1,
        driverRating: 1,
        name: name,
        team: team
      }
}