import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';


@Injectable()
export class RecipeService
{
  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe(
      'Tasty Schnitzal',
      'description test',
      'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAHgAqQMBIgACEQEDEQH/xAAcAAACAgMBAQAAAAAAAAAAAAAEBQMGAAIHAQj/xABBEAACAQIEAwUGBAUCAwkAAAABAgMEEQAFEiEGMUETIlFhcQcUgZGhsSMyQsFS0eHw8WJyFSTCFjM0Q1NjgpKi/8QAGQEAAwEBAQAAAAAAAAAAAAAAAgMEAQUA/8QAKhEAAgIBAwMEAQQDAAAAAAAAAAECAxESITEEE0EiMlFhcRQjsdGBkaH/2gAMAwEAAhEDEQA/AL3kubLmFMiFgXZAZWXkBvq+1vjiucSuTxDN3NIZlYDw7oxDwxWJFSQTO/eLn8Im3aMANNz4DckffbA+czM+eqZQC7gFiL2LW3t5YV1fqqUh1Ue3fKD8ZG0kir3mNgAcaCrgdEOsb6Qo82FwMAZ9M0WTVjK1n7FlX1IsPqcKQWWoXUTZa5QBflogA++JVsNZYDWCArOnfj2BAP5h5YYvBT5lB2tPMe6TpdOanlYjFVyyYz5LRs25ZVJv5f4xA0tVTyxPSTvC+kszIbXuRz8euKar9C0yWUTW0a3qjsyy/wDB6kSB/eEudy51EjfoD0/v1JjoaeiiZ2IUfrkktv8A3vikScT8RLKYlq0v0bsEv9vEYNyRMzzmeWoq53kji2MszaY4/wBr+Q3w5XUw3hHcU6bZ7Tew7nnFRMNF1jtaMHr6+uI56YSKfXYeOJBUZXSkCNGrpU37Qkog9BzP0x5NnleEIp5Ep18IYwv15/XEFtik8yZZXDSsRF9LlNUZm0UtQy72IiJGDGyuoS/a0kyjmLxkfthdNnFaX/GrqhifGZv543jzLMIqZapZqxYT/wCaJTbw8cTtwXJQlJkfBsN8kpmcSRlHkup2/V18sWiJe9IdNr2v54R0/EdcQFllSoX+GeMP9ef1w1pc4oZyVnielcndkJdPlzH1w3Kb2F7rkMa1wzbA7MR088DzI8coDjYjusOTemDWj0prUq0bDZ0NwcCaZFYJG90P6GFxgs45B/BNTVLU6srqkkLbOknIi2PFyvI6tzJCqxseasth8DyOPCTpsaOMnx7Zh9MYwlcblIgekfP5nCbKKrF6kFGc48B8VBTxDRHJAQDy7VR9BiKojiS7NJ2lv0qLKBivrPUQVOhVAjF778sMq94Y4EZdIeQhV25eeF19HTXvCITum9mxNWzuZZCFaRifIAeAwL21V/6KfX+eD6iD8QnUPQb/AL407H/UPp/PFa4Flc4d4jo6rMI4BrBaRBEnaaAxvyxaOLgBn9K5XTqgU222O+OLU0L9svZkhhuCOd8dVvLUw5PVyEkTQHm9wCuxt4bnlh1ks1afgfdX+53vk3zcGalSJjsXQt6BgcBNFMmkuN0qJmb/AHMLAYa1FDPXWMClgmxtgarpayMglGs0vaWI8ueJ0JZFlUTpldNHbdY+XwONK9HUWhXU7sEHkBzP9+WHeX02ijjuLG/74no6FJJTVVC3p4ea3/Ox30j9/TzwWAciPL8j3GYZxdYVGmOJTZp/TwW/M/LxxLmNbJUBIlCxQptFDEtkT0H79cMM2qQ3aVFQwAA2A2sPAYrFVXvQzxV1RTK6C5RFk1MuxtyuBz9dsDZNRQ6iruPd7BPvMVJVCnm1B2FzYXCnwP3w+kyeeQqtJJFURuupZY2uvK/r1xXeH5nz/MZnioDa4bWxA07bAEjnvi5xNGlWscFQWemUI0jG9z6DrfHPusknhLcrnQo+1nNaWmqsyziYmlnkihkCx6bhD4knkd/6YuqxRHh6pyuou57Bll7EAXJHMA9f3wdmucrl1Os88QkV9XZsNPPl89sVSln4g4hq6l6GmgNAZlhZ+2CmG4JJNxe23L0xk+5dwsYCh24RWrlinhquy+WGpFdKHc2ESspBIH6v6YI97gGYQQZc8jxyWVhKNJBPlyxvWZHk0DlKaDMhWBu9LDGbMfFVYbjEv/Zyp7BKjLZ3qp0l7X8aJopTsLDSefLxw3XDXqyzzrShgsmXVc9GT2ZBQ7NGwureow4V46gCohJVUH4kZ3KefmMJhPRVbq1AxLaR2sbArpb44nppGikWWI2YdeeKoNS2yc+cXEZxydojNoIANgT1xK1tPjjQlXgEkQCoTbSP0Hw9MaMwCG528b4JLAOcmPTRyk6k3JO5++PGpI0CRyRrKEF9T+Pp8cTQypKt0/SwU7deuPKo99FvsxsfQYPGwORdUrpBZVsvJQMC/i/6vphpUDU62PPy/vyxHok/hHzwEk8hpo4/R016mLzO+2OkRQaOH8mdhcRzTIR4gkH9jil5dEFqIrbBd226D0/ljocul+FaZlIIWdWuPO+HKLkpMv6yShXFeWyw8FGirIaqDtAalJdRQ89BAsfmCMNM4y6nipZZ5mCxop1MegxRuELJxtTS3/NDIGPlb/GNOIZnzziyWaSd3oqWQJTRXOlSLamtyve+/hjU46N0ctp6w6BdUUSILlrWA67jB9XEFC00dtEQsSOTt1bEOUAGqVwL9jEW9DsB97/DBNQ3u8Zew5gb+uAb0xbM5eCn8QiQ5hRUjJaF2LyMym1h/Yxpmebw0lDPCzRvHqCRNL3VLkbkdSOXLBvFD1JrKGX3ntR2WrQo3JJsR6C3qcLqXh53zKerz9kmpIrNDRtJfQL3/L0Hl43xzLLYylrlwXOtdjR9kGSSNS5XULTXatq2YxaL2Y8tvAbYAz/JM1oTDnmXTPFXtGpnSHdS4ABuPDoRi7QZRUjMI82zZ6WGkfSkLau6oJ2sAb32t154aZvHR5lVU+XUggXspDJJJuxKqC1gRtckDBVqUHqXn58gq6LrUWUfhDMa2rzCM5nlSSMydmyRzNH2V2XvbA2a/gb788XWWkyDJ3qKej1U0EDAVCpYiK9zqtzsd97k/LG1LMkxZ+3InniEgWIBimy3vq2Ugg3uRvbESZbl9DTyVM0D5rVT3Z+1U2kdbsO0WxCsACAN+XniiqLlFpxWBHelF5beTSolSnYjKw7JKl4VfYSAi9wRc35E4Dm4hoKjNggqUjmWBCUte29u78fTD3I0y7iCjMq5dJFRAkwTSSnUb3vZem+E/FMcFNHHSxClipKepDO6EPNcbXbe4PP5jCJdI3By/gvq6iuclHz9nO+OKitjzqaPSjRSESosN+X6tfLmefTA6Z3Hl3ZR0sXu8i7kKdr9Rt08sXqlyqHMFq2Y2qXmIp5wQscwC/8AdKOZba/Lrviq1S0VPWsktBI94QiDTqANybWPI/XbBJ6YRTX+h0EvUl/0veR1i1dLFKwKR1MYLA/pJHP4YmDG7obh0bS23XCvh2eNqdaVdnjUdy4vb0B2w4rzpMMh/Wtj6ggfa2LE9UcnKknCbizaN7qp8x98aT3NVGTawRtvljSmN4h6/vjap2lDf+2R9cF4AMd99iNsR9t6YjlYXJ2sScb6B4fXHjclH4fpu3zWnozGJGLCSoQm3dG+j4/0xeczy6GgySo90qCIWkT/AJZ7XQ35eI6nwxWPZ1Sa8zkm5kLz8ycXH2gSpDldOWVdbzBQ1twApJ+wxTBYpbG9fLV1Cj8Fd4cbTnUk7Gwggdr7+GNaZzE+om5PeJ873OFeXVTLFXFeTlYifXfBytZST4fPa+I8+AMbssvC/wCLDXS3JPapDfx0pq/6zgrPAkWXl6hHMTGx0EX+GBOAXE2SVEg5nMagH/4kL+2HGZQ0z07LPLGm1zrNri4vY/HDLl+2/wACq/eUHOpVbKhPRLK0UUgv2/MdSb25bH54Z1eWtxLQ0GZ5ZOWqRAIpHAuE/Xqt1tuPjgafOaPN2nyRHhSaaEim7WPTEHH5UO+98SUebRZW0tfH737zDTxUtRC8OmGIi97J1bnut9scqipaNUti6Xuaj5PMmranI+G3p8y7SrV4x2UGokDUdK2BFxyJv02x7leW1GQxLVUcbzOsxEUMgYvYnbcGxO4uRsL3PLC6pz1M5ilqKftqiEzBZuZcDwQm/IH0G3LD6gr6WqRcnadYqSmcpatnMNULWIKnSNQFyu3S29udtcXPaS44JJ6aZaYlgos2y2aor6aKoQ1kkZLQdlpGtR3+9yY3tci2DWaioPeIMsooIZmOsExaI5CR0I8trgWGKNwv22V1s81LR+/IsklPJHEw/C3FiGLW7wHUj62BvEmQ12c5ZBX5PmhSemQqympABFzdWIJGwAtvt8cVQUtG63J5PKyC5TlucVldUGqerBikV4KWKS6Dv925DEEAG/TDLMsszefJKipieWkzpVvcBSZBa9g1vM8rbjzwr4V7fJ8u7LNJDDo3BjBu17k3YHf5fPpdOFqwyUx7apSr1TEK6gd0EXC8+Q/LjKq4pY+TI5SOTy51US5kkWb0pqwEICluw7BrhiwK20G4B533vvcYqVbmCpnU80nbT0pB0o9QS1yL7stibX8r46nxdS0RzqRc1pK94qZyHzELqtrKmJSF3K94ruLXB88V3NMo4Pqc4rIJZ5abtJbRtTRsQh6d7SRp2352uPUZCvS92VRtejS08AfCWaMZu0p44YoVmVezVbML3PU7iwx0XMrHLVk5aZV+RxzzguhSonepWF0VHKI7jvSAcifOxF8dBzZQmRTXHJ4+f+8YFRxqZtktUkgWlkBhBB2v++JqxrS6b37h++FtHOq00jm2le/f6/vguqNpQQLnQd7+ePZ2BxuQGQlt+V7H5Yn7U4Xk6lG5Q6lO2JtbeJ+eNMBPZ/K1ItVUmmkkiS3fUje3S3Pr0vg72nSTOtBHKgj/ADsoV9XgDfYb7jBvAVLE+WIJojtNrs224NwfTlhD7TEegrKaIteI9tLGfAMVuPnf54smsUYBtnq6lv7ENOSMrHZ2/Eqbg+IUf0w0iYmG53uBt64ThjDlGX9C2pyfX/OGlO2uLSDbvfuMQPkb4LJ7L5g2X5vTfqgzSU28mAb+eH+f5m+VwioWlSZALEO1r78vWwxRPZvXpS8cZxlrNZa6BJkH+tOf0Y/LyxdOM6cVGUlSoYxHtY1JsNY5fy+OHXQ114yKreLDm3G9JQZzTnMcsKI2zyRxC6tbxI5EXHTrgSpyrNEy6KmmrzO1VGkytJOzsY7baQdwOXrfDgyZdRxxUNQIKUSoGZoySF1XNiOvocDZlnC1ZoKEpFGaKJKPUjEtMo07+QsCevXHOhPMGvjg6tleHFrzyVrN6WRs0/4fSjs41Y99ySUsAL/T64uHs8lFDVVK17yK9XTJHSTVqtJ2jqTpYXJ0gXOwI6WxPV09FHlEvvMQjm1n/mb3ZtQICr4cgcJ80zgZmlLSRVL03ZKokkZCNY9fLBV9TL0pceSKzps533LXxZU1OVZZUT0kdH7rXxSU0j0/4YV1va/8T3vyt+2N5pKQ8P1eR5Jm9NU5xNTOrUsjozOzgatTHZjvyxU6GgybNMxq5ZcwzCOEVCGegjQSwvJyV2A5hrc7X54jkoqejzJI+H6atQduWso1BWFxrW1yBuR5X6Yv1KHq5yRz9v4HslJFQ8OU1NmryJHQxRzfiEFu2Nwq2uSttJNtvnhPlHDecQ5y1bRJNB2RWZZUBcTNqJvsRse6CCfEnlgqly0UdJVS53TxOkCEvJLVgtI9yRrubuegF98NKavkraZ8vy7OaYUqQB5GpO5JAGvc2BJuNjba17XxievLN1Rwki6tDUVVNTZhXLSx5hFGJahZeUClT522IPP16YqEVZk0z1dVm89JAzRFAXYyEseqR89gDsPLfCOo9oIo6KalySl95ZnRVlq4+0jqY1W3fUkMCQBzwHw9AnEOeQvU04iNQ7m0QMccRtcBb81O4tzsMBfjKkVdO/RJMunDNLSmEPSSGSFzrjJAF1IFjYE29MH8VgJkhQtp7SeNfgDf9sT5Bli0ECwx27osSOXwwr45nDS0dCu5sZHA6XNh9jjIxcKmmLctduRTTvGMvcLdgY2+gGD6olHi1mw7NvuP64X0sWijZRvZG3+WC8xYGtgRgdLI4Pnyxi4C8gb6tQINxcW++DLDwwO6ppFmsBsBbGXj/jOCwCM8ko5GzKmWvihAYkEN3lQHkq7bHpioe1KWCHiNqSnjVQsKDSo5sxJ/ljolXWUPD9HPUZxIIgYyqKzBml077AdSSccfjmqc+4qWtmPeklaR+tlRb2//ACBi/qJLGCalPORtWJelo4f4bLb4HDGnFo0FvDYfH+WAKhG7eHWDYFb28bMcHzStFGVjW7AHfwPT745vkr8FbzaafJc1os+pVJeiqSWH8SGykfHcfHHaquSDOMnirKQiWnniDofFSMcdzciooWicgLK6hh4C+s/cYbeyDiv3CpbhfNZNMUjFqKR+QY809DzHncYph6o6RM1iWRVm2V5kKqrSGGU0GpGZlu3Z2tt49Dt09MP+CKzJMsnqKuZzHUxcu3X8q3tsTzYkgegxbOJuGBWMzxAKx3YEAq3kRimZzlkmXZFmEwoUqFDo041FZI9J/MOd+iny8sSvNbUWitWdyLeS0Z9w2c4khq6J5EohFcKq8j0KLtsb8/IYqeY8N1+VZPN345azsywWLnpW5OxF7kHw6YnofaVURZBS0NLD2pjRUklJCOoGwFrEG/8AFcb9BhdmOf5DNHJKlcVrpBeaNYXJW17B5GIDnc8geZwx0wb9KEKc1nUwz2bcQZXQv2U8FVLUSBIEWLQsaQi51Mb3B1M2/XbwxYKasoskqnWrzGsoGZNMbVgWPXsT37CwPx39cVT2fU9JUmsOWJra6A3/ADXFzt0+A5Ys2bZfl1TmdLHnAf3SJo5oxpbvjYnULbjmLdcTytl31F+2LW/+BkKEqsp5b/sTcWUlFBDTZxl9RTB3sJIFQHz367bc/EeOAqDiJzPFA2WULI6iGGeE/iRueWo+H9743nyupkrpjCrNT1FVK8jqBoaNjsLeS2G3gMIs7y+nfNJY6IiGOmUBeyU3LjfTz88HG2Lm2ga6ZPOpBNXl9Tk1WlboSoeQyJLTS3GtSASbjl4eW2HfBGX02YCFKuJveYVDLqYkuL7m/kenTAEmbV2fRQXV554WVUKhQbWPz8ycXjhDhGakrRmVZMxcD8OFV0hbi24HM2OCp1TeJLgO7TCOz3Za6YJTws8h0oilmPQADc45vmVcuZ5i9U5a0koCrbpew9LDFh44zkKpyijkGs/+IYdPBP54q9OymUCw7pJW/rhtrT2EVrG4wpxqpHBNjY+eDMyjDSxOejED4jAsBAgcE9D+2DMwNhHflqN/rgFwGxaX1WPW/LGdofAfLHqtqC6Cv5vDmMT9l5J/9Rj2TcHN6ysq80lEtbPLM52BduWGHD1UuX5gS4AEsLx6jyF7X+gOF+nTIi23xtOgkiF7d57WvuLY1yy9zFHC2LJDUipqWCbqn4lvhYfviWSRpCqLfdgL+n+BgHJQlPRGS/dG53vck4LjY+4a/wBTLpHqdjgeWFwhRnCEnUGB1ksoHMD+7D4YWV2WGppBNF3Z4jdGU2Pjb4Ys1ZQxPGXkLEhdIVebeH88J5Y6mCNQBLpsAAXv9MFFtPILWVgvns19oseZpHkvEcqxZkvcinY2FR5Hwf74vWa5X7xG8kAUSlCjow2kXwOPmjMKftZidJEn38xi58H+1PM8hWOhz6N8woVsqSg/ixj1P5x67+eKJRjZHDE7wllEPGHClfksktVBRSe6M2pyCGEfjsALL54rk7icDXLcMACSAfjj6IyXiLIeJodWV18E5tvETpkX1U74T597PMizJ2maiWKY7l4GMdz5gGx+IwPaxwwu9nk5pk1bDwjThqVxM7ShyVdVB5AgH0GDOIuNlrc3pKzLYRF7vG0fYqt1bVbx8PTx8sNX9mVHDOWjLsP9RBOHOX8C0cZv2QBPM23OFdnn75G/qFt9HLo80zSuq5I6uq7Ic0hVyAR1+wxbMi4dzXOIVakaOOkfnM4tbxsOuOgUHBWTwOsjUccjruNYvbDDN88yPhumDZnXU9Ko/LGDd29FG5+WPfpYt78Grq5JbcgfD3CdJlCDQNcvNpCO8x88LuLuMYctd8ryhlmzIi0jjdab1/1eXTmel6dxN7TcwzctScPQyUNGTpapcfjSDwA/SD48/TCjJ6MpGXYgkm5PUnrf474bKSgsREKLm8yGESsyl2YlmJZixuST/jB1PGNYkIGrcXHhf+mIlTTpB5A/3++CIDy68lP9/DEo8IpwezIAve4+2D6wGynn3j9sBU67ksxv1QHpcb4Y1IuFU8yT9sGuAWI4KlJZnVGvok0nzwx0+WAVplhqZJUC3Y7i/rvhh2n+3GBHMhf/AIsgJJs4AwSiJUZjFCp1KGa/rjMZjx4sdXRxw0AWm21bm+I4w3Y0qMoGsqF8bAkk/bGYzGeT3gLqFDzL1ANgBhdmM5UvDHEvafxk2BPnjzGYJAiCoQSyxmRAGA3K9RbEM1GhOm1xa2+MxmNbwewATZT2UolppHiddwymxHoemHGXca8ZZSgSHN5Z41/TU/i/Vt/rj3GYbGxgSghlH7W+KRbXS5ZJ43hYE/JsbSe1zirSStLlcQA5iFj92xmMwxSYGhCus464szhCJ86lgjb9FKOy+o3+uAKWgEkwmmLzStuZJDqJ+JxmMwE5MOEUOaKlBSzC1uRHPlc4eUiW0ryHQfDGYzCGMQbLENQ8Lf0/fGyqVYgjYn9v64zGYE0OgUdmfMn7jB9SFugO5Gqx+AxmMwS4AfIuKjUTc7k42288ZjMYEf/Z',
      [
        new Ingredient('MEat', 1),
        new Ingredient('Fries', 2)
      ]
    ),
    new Recipe(
      'recipe1',
      'description1',
      'https://www.gimmesomeoven.com/wp-content/uploads/2014/03/Cajun-Jambalaya-Recipe-with-Andouille-Sausage-Shrimp-and-Chicken-3-1.jpg',
      [
        new Ingredient('Buns', 2),
        new Ingredient('Meat', 2)
      ]
    )
  ];
 constructor(private slService: ShoppingListService){

 }

  getRecipes(){
    return this.recipes.slice(); // this will return a new copied array.
                                // like this I change the copy and not the original.
                                // It was needed because arrays are reference types in JS

  }

  addIgredientsToShoppingList(ingredients: Ingredient[]){
        this.slService.addIngredients(ingredients);
  }
}