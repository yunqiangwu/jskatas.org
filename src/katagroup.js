import Kata from './kata.js';

export default class KataGroup {
 
  static withKatas(groupName, rawKataItems=[]) {
    var group = new KataGroup();
    group.name = groupName;
    group.katas = rawKataItems.map(item => Kata.fromRawItem(item));
    group.sortByName();
    return group;
  }
  
  sortByName() {
    this.katas.sort((kata1, kata2) => kata1.id < kata2.id ? -1 : 1);
  }

  get highestId() {
    return this.katas[this.katas.length - 1].id;
  }
}