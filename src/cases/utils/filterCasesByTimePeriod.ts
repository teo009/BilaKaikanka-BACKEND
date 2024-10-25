import { Case } from '../entities';
import { CasesByQuarterOrMonthlyDto } from '../dto/reportsDtos';

export function filterCasesByTimePeriod(
  caseData: any,
  clientOptions: CasesByQuarterOrMonthlyDto,
) {
  let filteredCases: any = null;
  filteredCases = caseData.filter((singleCase: Case) => {
    //const caseDate: Date = new Date(singleCase.created_at);

    if (clientOptions.timePeriod === 'monthly') {
      //return caseDate.getMonth() + 1 === clientOptions.exactTime; //exactTime is when the case was created
    }

    if (clientOptions.timePeriod === 'quarter') {
      //Add quarter logic here
    }
  });
  return filteredCases;
}
