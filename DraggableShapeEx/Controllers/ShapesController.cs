using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.Extensions.Logging;

namespace DraggableShapeEx.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ShapeController : ControllerBase
    {

        [HttpGet]
        public IEnumerable<Shape> Get()
        {
            List<Shape> Shapelist = new List<Shape>();
            Shapelist.Add(new Shape()
            {
                Name = "square",
                Width = 50,
                Height = 50,
            });
            Shapelist.Add(new Shape()
            {
                Name = "circle",
                Width = 50,
                Height = 50,
                BorderRadius = 50
            });
            Shapelist.Add(new Shape()
            {
                Name = "triangle",
                Width = 0,
                Height = 0,
                BorderBottom = 50,
                BorderLeft = 25,
                BorderRight = 25
            });

            return Shapelist.ToArray();
        }
    }
}