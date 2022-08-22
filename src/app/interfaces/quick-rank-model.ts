import { BallotOption } from "./ballot-option";

export interface QuickRankModel {
    ballotOptions: BallotOption[];
    votes: string[][];
}
