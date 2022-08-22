export class AddUpdateBallotOption {
    static readonly type = '[QuickRank] Add/Edit Ballot Option';
    constructor(public display: string, public id?: string){}
}

export class CastVote{
    static readonly type = '[QuickRank] Cast Vote';
    constructor(public ranking: string[]){}
}