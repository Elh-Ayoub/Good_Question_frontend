import '../css/posts.css';
import user from '../images/user-icon.png';

function PostCard(props) {
    return( <div className="Postscontainer">
            <article className="post">
                <div class="postsheader">
                  <figure class="text-center">
                    <img class="img-responsive" src={user}/>
                    <figcaption class="post-author">{props.Post.author}</figcaption>
                  </figure>
                  <div class="panel panel-default arrow left">
                    <div class="panel-body">
                      <header class="text-left">
                        <div class="title">{props.Post.title}</div>
                        <time class="post-date"><i class="fa fa-clock-o">Created at: {props.Post.author}</i></time>
                      </header>
                      <div class="post-content"><p>{props.Post.content}</p></div>
                      <div class="post-categories">
                            {props.Post.categories.split(',').map((category, key) => 
                              <div className="category">{category}</div>
                            )}
                      </div>
                      <div class="post-likes">
                      <div class="nav-icon fas fa-like"></div>
                      </div>
                    </div>
                  </div>
                </div>
            </article>
        </div>
    )
}

export default PostCard